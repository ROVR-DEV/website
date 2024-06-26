<template>
    <button class="player-button player-button--radio"
        :class="{ 'player-button--disabled': isLoadingTrack , 'player-button--loading': playerStore.isLoading }"
        v-press="{ time: 150, scale: 0.96 }" @click="play(150)">


        <Spiner v-if="isLoadingTrack" />

        <img v-if="!isLoadingTrack && shouldShowPlayButton" src="@/assets/images/ui/play_button.svg" alt="play">
        <img v-else-if="!isLoadingTrack && shouldShowStopButton" src="@/assets/images/ui/stop_button.svg" alt="stop">
        <img v-else-if="!isLoadingTrack && shouldShowPauseButton" src="@/assets/images/ui/pause_button.svg" alt="pause">
    </button>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';
    import Spiner from "@/views/Spiner.vue";

    const playerStore = usePlayerStore();
    const isTouchEventDisabled = ref(false);
    const shouldNewArchivePlay = ref(false);
    const newArchiveDelay = ref(false);

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

    watch(() => props.archive_id, (id) => {
        if(id !== playerStore.now_playing_archive) {
            newArchiveDelay.value = true;
            setTimeout(() => {
                newArchiveDelay.value = false;
            }, 2000);
        }
    });

    const play = async (delayTime) => {
        isTouchEventDisabled.value = false

        playerStore.togglePlaying(props.archive ? 'archive' : 'radio');

        if (props.archive && playerStore.source === 'archive' && playerStore.now_playing_archive !== props.archive_id) {
            playerStore.setSoundcloudSecret(props.soundcloud_secret);
            shouldNewArchivePlay.value = true;
        }
    }

    // watch(() => playerStore.isReady, () => console.log(playerStore.isReady), {immediate: true})

    const handleMessage = (event) => {
        const { action } = event.data;

        if (action === 'is_ready') {
            // console.log(playerStore.isReady)
            playerStore.isReady = true // !!
            // console.log("is_ready handleMessage")
            if (shouldNewArchivePlay.value) {
                playerStore.startX = 0; /// resetX
                playerStore.play('archive');
            }

            shouldNewArchivePlay.value = false;
        }
    }

    const isLoadingTrack = computed(() => {
      return isTouchEventDisabled.value || newArchiveDelay.value || props.soundcloud_secret === '' || !playerStore.isReady
    })

    watch(() => playerStore.isReady, () => console.log(playerStore.isReady))


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
        playerStore.isReady = false //!
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
          opacity: 0.5;
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