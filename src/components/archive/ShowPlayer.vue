<template>
    <play-button archive :archive_id="show_id" :soundcloud_secret="sc_secret" />

    <div class="archive-player">
        <img src="@/assets/images/icons/soundcloud.svg" class="archive-player__icon" alt="soundcloud">

        <div class="archive-player__finish" v-if="playerStore.is_archive_finished">
            Next Show
            <div class="ball-beat">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

        <div class="archive-player__timeline-wrapper">
            <div class="archive-player__timeline--fake" ref="timelineFake" @mousedown="startDragging"
                @touchstart="startDragging">
                <span class="archive-player__thumb" ref="rangeFake" />
            </div>

            <div class="archive-player__timeline--visual" ref="timeline">
                <span class="archive-player__range" ref="range" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';
    import PlayButton from '../ui/PlayButton.vue';
    import 'loaders.css';

    const playerStore = usePlayerStore();
    const duration = ref(0);
    const timeline = ref(null);
    const timelineFake = ref(null);
    const range = ref(null);
    const rangeFake = ref(null);
    const isDragging = ref(false);
    const startX = ref(0);
    const startLeft = ref(0);
    const currentTrack = ref(null);

    const props = defineProps({
        tracks: {
            type: Array,
            required: true,
        },
        show_id: {
            type: Number,
            required: true
        },
        sc_secret: {
            type: String,
            required: true
        }
    });

    const currentTrackTitle = ref('');
    const currentTrackArtist = ref('');

    watch(() => props.show_id, (newId, oldId) => {
        if (newId !== oldId) {
            isDragging.value = false;
            range.value.style.left = '0px';
            updateRangePosition(0);
        }
    });

    const startDragging = (event) => {
        isDragging.value = true;
        startX.value = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
        startLeft.value = rangeFake.value.offsetLeft;

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchmove', onDrag);
        document.addEventListener('touchend', stopDragging);

        document.body.classList.add('grabbing');
    }

    const onDrag = (event) => {
        if (!isDragging.value) return;

        const currentX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
        const deltaX = currentX - startX.value;
        const newLeft = Math.min(Math.max(startLeft.value + deltaX, 0), timelineFake.value.offsetWidth - rangeFake.value.offsetWidth);

        rangeFake.value.style.left = `${newLeft}px`;
        range.value.style.left = `${newLeft}px`;
    }

    const stopDragging = () => {
        isDragging.value = false;
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDragging);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('touchend', stopDragging);

        document.body.classList.remove('grabbing');

        const timelineWidth = timelineFake.value.offsetWidth;
        const rangeWidth = rangeFake.value.offsetWidth;
        const newLeft = Math.min(Math.max(rangeFake.value.offsetLeft, 0), timelineWidth - rangeWidth);

        rangeFake.value.style.left = `${newLeft}px`;
        range.value.style.left = `${newLeft}px`;

        const newPosition = (newLeft / (timelineWidth - rangeWidth)) * duration.value;

        updateTrackInfo(newPosition);
        seekTo(newPosition);
    }


    const updateRangePosition = (position) => {
        if (!isDragging.value && playerStore.now_playing_archive === props.show_id) {
            const timelineWidth = timelineFake.value.offsetWidth;
            const rangeWidth = rangeFake.value.offsetWidth;

            const newLeft = (position / duration.value) * (timelineWidth - rangeWidth);
            rangeFake.value.style.left = `${newLeft}px`;
            range.value.style.left = `${newLeft}px`;
        }
    }

    const updateTrackInfo = (position) => {
        if (!props.tracks || props.tracks.length === 0) return;

        if (playerStore.now_playing_archive === props.show_id) {
            currentTrack.value = props.tracks.find(track => position >= track.start * 1000 && position < track.end * 1000);

            if (Math.round(position / 1000) < 16) {
                currentTrackTitle.value = 'Incoming...';
                currentTrackArtist.value = 'ROVR';
                playerStore.updateTrack(currentTrackTitle.value, currentTrackArtist.value, '');
            } else if (Math.round(position / 1000) > 16 && currentTrack) {
                if (currentTrack.value.title !== currentTrackTitle.value || currentTrack.value.artist !== currentTrackArtist.value) {
                    currentTrackTitle.value = currentTrack.value.title;
                    currentTrackArtist.value = currentTrack.value.artist;
                    console.log(currentTrack.value);
                    playerStore.updateTrack(currentTrack.value.title, currentTrack.value.artist, currentTrack.value.label, currentTrack.value.cover);
                }
            }
        }
    }

    const seekTo = (position) => {
        window.parent.postMessage({ action: 'seekTo', value: position }, '*');
    }

    const handleMessage = (event) => {
        const { action, value } = event.data;

        switch (action) {
            case 'duration':
                duration.value = value;
                break;
            case 'position':
                updateRangePosition(value);
                updateTrackInfo(value);
                break;
        }
    }

    onMounted(() => {
        timelineFake.value.addEventListener('mousedown', startDragging);
        timelineFake.value.addEventListener('touchstart', startDragging);

        window.addEventListener('message', handleMessage);

        // Синхронизировать позиции при монтировании
        if (playerStore.now_playing_archive === props.show_id) {
            updateRangePosition(0);
        }
    });

    onUnmounted(() => {
        timelineFake.value.removeEventListener('mousedown', startDragging);
        timelineFake.value.removeEventListener('touchstart', startDragging);
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDragging);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('touchend', stopDragging);

        window.removeEventListener('message', handleMessage);
    });
</script>

<style lang="scss" scoped>
    .archive-player {
        @include flex-center;
        position: relative;
        flex: auto;
        margin-left: 2.5rem;

        &__icon {
            position: absolute;
            top: -4.5rem;
            right: 0;
        }

        &__timeline {
            &-wrapper {
                width: 100%;
                position: relative;
            }

            &--visual {
                opacity: 1;
                position: relative;
                height: 4px;
                border-top: 4px dotted $primary;
                cursor: pointer;
                width: 97%;
                margin: 0 auto;
                z-index: 1;
                @media screen and (max-width: 1024px) {
                    width: calc(96% - 3px);
                }
            }

            &--fake {
                opacity: 0;
                position: relative;
                top: 8px;
                height: 8px;
                border-top: 4px dotted red;
                width: calc(100% - 70px);
                margin: 0 auto;
                z-index: 2;
            }
        }

        &__range {
            display: block;
            position: absolute;
            width: 70px;
            height: 0.875rem;
            background-color: $primary;
            top: -8.5px;
            left: 0;
            opacity: 1;
            cursor: grab;

            @media screen and (max-width: 480px) {
                top: -7px;
            }
        }

        &__thumb {
            position: absolute;
            opacity: 1;
            width: 14px;
            height: 20px;
            cursor: grab;
            top: -8.5px;
            left: 0;
            background-color: red;

            @media screen and (max-width: 480px) {
                top: -7px;
            }
        }

        &__finish {
            @include flex-center;
            @include font-size(14px);
            color: $primary;
            position: absolute;
            top: -3.75rem;
            right: 5rem;

            .ball-beat {
                margin-left: 1rem;

                * {
                    background-color: $primary;
                    width: 0.625rem;
                    height: 0.625rem;
                }
            }
        }

        &__range.grabbing {
            cursor: grabbing;
        }
    }

    body.grabbing {
        cursor: grabbing;
    }
</style>
