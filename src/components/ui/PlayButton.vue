<template>
    <button class="player-button player-button--radio"
        :class="{ 'player-button--disabled': isTouchEventDisabled || !isReady, 'player-button--loading': playerStore.isLoading }"
        v-press="{ time: 150, scale: 0.96 }" @click="play(150)">

        <img v-show="shouldShowPlayButton" src="@/assets/images/ui/play_button.svg" alt="play">
        <img v-show="shouldShowStopButton" src="@/assets/images/ui/stop_button.svg" alt="stop">
        <img v-show="shouldShowPauseButton" src="@/assets/images/ui/pause_button.svg" alt="pause">
    </button>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    import { usePlayerStore } from '@/stores/player';

    const playerStore = usePlayerStore();
    const isTouchEventDisabled = ref(false);
    const isReady = ref(false);
    const shouldNewArchivePlay = ref(false);

    const props = defineProps({
        archive: {
            type: Boolean,
            required: false
        },
        archive_id: {
            type: Number,
            required: false
        },
        soundcloud_secret: {
            type: String,
            required: false
        }
    });

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const play = async (delayTime) => {
        isTouchEventDisabled.value = true;
        setTimeout(() => isTouchEventDisabled.value = false, 2500);

        await delay(delayTime);
        playerStore.togglePlaying(props.archive ? 'archive' : 'radio');


        await delay(1000);
        if (props.archive && playerStore.source === 'archive' && playerStore.now_playing_archive !== props.archive_id) {
            playerStore.setSoundcloudSecret(props.soundcloud_secret);
            shouldNewArchivePlay.value = true;
        }
    }

    const handleMessage = (event) => {
        const { action } = event.data;

        if (action === 'is_ready') {
            isReady.value = true;
            if (shouldNewArchivePlay.value) {
                playerStore.play('archive');
            }
            shouldNewArchivePlay.value = false;
        }
    }

    const shouldShowPlayButton = computed(() => {
        return (!props.archive && !playerStore.isPlaying) ||
            (!props.archive && playerStore.isPlaying && playerStore.source === 'archive') ||
            (props.archive && !playerStore.isPlaying) ||
            (props.archive && playerStore.isPlaying && playerStore.source === 'radio') ||
            (props.archive && playerStore.isPlaying && playerStore.now_playing_archive !== props.archive_id);
    });

    const shouldShowStopButton = computed(() => {
        return !props.archive && playerStore.isPlaying && playerStore.source === 'radio';
    });

    const shouldShowPauseButton = computed(() => {
        return props.archive && playerStore.isPlaying && playerStore.source === 'archive' && playerStore.now_playing_archive === props.archive_id;
    });

    onMounted(() => {
        window.addEventListener('message', handleMessage);
    });

    onUnmounted(() => {
        window.removeEventListener('message', handleMessage);
    });
</script>


<style lang="scss" scoped>
    .player-button {
        @include flex-center;
        border: none;
        outline: none;
        border-radius: 50%;
        background: $primary;
        color: $black;
        width: 6rem;
        aspect-ratio: 1;
        padding: 0;
        cursor: pointer;
        &--disabled {
            pointer-events: none;
        }
        &--loading {
            animation: pulse 1s infinite ease-in-out alternate;
        }

        @media screen and (max-width: 1660px) {
            width: 6.25rem;
        }

        @media screen and (max-width: 1440px) {
            width: 5rem;
        }

        @media screen and (max-width: 480px) {
            width: 6rem;
        }
    }

    @keyframes pulse {
        from {
            transform: scale(1);
        }

        to {
            transform: scale(1.05);
        }
    }
</style>