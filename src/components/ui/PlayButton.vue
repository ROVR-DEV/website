<template>
    <button class="player-button player-button--radio"
        :class="{ 'player-button--loading': isLoadingTrack }"
        v-press="{ time: 150, scale: 0.96 }" @click="play(150)">

        <spinner v-if="isLoadingTrack" />

        <img v-show="shouldShowPlayButton && !shouldShowTapButton" src="@/assets/images/ui/play_button.svg" alt="play">
        <img v-show="shouldShowStopButton && !shouldShowTapButton" src="@/assets/images/ui/stop_button.svg" alt="stop">
        <img v-show="shouldShowPauseButton && !shouldShowTapButton" src="@/assets/images/ui/pause_button.svg" alt="pause">
        <!-- FOR iOS AUTO-PLAY -->
        <img v-show="shouldShowTapButton" class="tap-icon" src="@/assets/images/icons/tap.gif" alt="tap">
        <!-- FOR iOS AUTO-PLAY -->
    </button>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';
    import { isIOSDevice } from '@/utils/isIOSDevice';
    import Spinner from '@/components/ui/Spinner.vue';

    const playerStore = usePlayerStore();
    const isTouchEventDisabled = ref(false);
    const shouldNewArchivePlay = ref(false);
    const newArchiveDelay = ref(false);
    const isArchiveReady = ref(false);
    const shouldShowTapButton = ref(false);

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
        },
    });

    const isLoadingTrack = computed(() => {
        return playerStore.isLoading || (!playerStore.isPlaying && !isArchiveReady.value && props.archive_id === playerStore.now_playing_archive) || newArchiveDelay.value || props.soundcloud_secret === '';
    });

    watch(() => props.archive_id, (id) => {
        if (id !== playerStore.now_playing_archive) {
            newArchiveDelay.value = true;
            setTimeout(() => {
                isArchiveReady.value = false;
                newArchiveDelay.value = false;
            }, 2000);
        }
    });

    watch(() => playerStore.is_archive_finished, (is_archive_finished) => {
        if(is_archive_finished && isIOSDevice()) {
            shouldShowTapButton.value = true;
        }
    });

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const play = async (delayTime) => {
        isTouchEventDisabled.value = true;
        setTimeout(() => isTouchEventDisabled.value = false, 2500);

        await delay(delayTime);

        if(shouldShowTapButton.value) {
            playerStore.play('archive');
            shouldShowTapButton.value = false;
        }

        if(props.archive) {
            if (playerStore.now_playing_archive === props.archive_id || playerStore.now_playing_archive === null) {
                playerStore.togglePlaying('archive');
            } else {
                await delay(1000);
                if (playerStore.now_playing_archive !== props.archive_id && playerStore.source === 'archive' && playerStore.isPlaying) {
                    playerStore.togglePlaying('archive');
                }
                playerStore.setSoundcloudSecret(props.soundcloud_secret);
                shouldNewArchivePlay.value = true;
            }
        } else {
            playerStore.togglePlaying('radio');
        }
    }

    const handleMessage = (event) => {
        const { action } = event.data;

        switch (action) {
            case 'is_ready':
                isArchiveReady.value = true;
                if (shouldNewArchivePlay.value) {
                    if (isIOSDevice()) {
                        shouldShowTapButton.value = true;
                    } else {
                        playerStore.play('archive');
                        window.parent.postMessage({ action: 'reset_metadata' }, '*');
                    }
                }
                shouldNewArchivePlay.value = false;
                break;
            case 'show_tap_button_ios':
                shouldShowTapButton.value = true;
            default:
                break;
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
        .tap-icon {
            width: 3rem;
        }
        &--loading {
            opacity: 0.5;
            pointer-events: none;
            img {
                display: none;
            }
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
</style>