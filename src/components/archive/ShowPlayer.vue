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

        <div class="archive-player__timeline" ref="timeline" @mousedown="startDragging" @touchstart="startDragging">
            <span class="archive-player__range" ref="range" />
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
    const range = ref(null);
    const isDragging = ref(false);
    const startX = ref(0);
    const startLeft = ref(0);

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
        startLeft.value = range.value.offsetLeft;

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
        const newLeft = Math.min(Math.max(startLeft.value + deltaX, 0), timeline.value.offsetWidth - range.value.offsetWidth);

        range.value.style.left = `${newLeft}px`;
    }

    const stopDragging = () => {
        isDragging.value = false;
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDragging);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('touchend', stopDragging);

        document.body.classList.remove('grabbing');

        // Get the current position of the range
        const rangeLeft = range.value.offsetLeft;
        const timelineWidth = timeline.value.offsetWidth;

        // Calculate the new position in milliseconds
        const newPosition = (rangeLeft / timelineWidth) * duration.value;

        // Seek to the new position
        seekTo(newPosition);

        // Update the range position after seeking
        updateRangePosition(newPosition);

        // Update current track after seeking
        updateTrackInfo(newPosition);
    }

    const updateRangePosition = (position) => {
        if (!isDragging.value && playerStore.now_playing_archive === props.show_id) {
            const timelineWidth = timeline.value.offsetWidth;
            const rangeWidth = range.value.offsetWidth;
            const newLeft = Math.min((position / duration.value) * timelineWidth, timelineWidth - rangeWidth);
            range.value.style.left = `${newLeft}px`;
        }
    }

    const updateTrackInfo = (position) => {
        if (!props.tracks || props.tracks.length === 0) return;

        if (playerStore.now_playing_archive === props.show_id) {
            const currentTrack = props.tracks.find(track => position >= track.start * 1000 && position < track.end * 1000);

            if (Math.round(position / 1000) < 16) {
                currentTrackTitle.value = 'Incoming...';
                currentTrackArtist.value = 'ROVR';
                playerStore.updateTrack(currentTrackTitle.value, currentTrackArtist.value, '');
            } else if (Math.round(position / 1000) > 16 && currentTrack) {
                if (currentTrack.title !== currentTrackTitle.value || currentTrack.artist !== currentTrackArtist.value) {
                    currentTrackTitle.value = currentTrack.title;
                    currentTrackArtist.value = currentTrack.artist;
                    playerStore.updateTrack(currentTrack.title, currentTrack.artist, currentTrack.label, currentTrack.cover);
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
        timeline.value.addEventListener('mousedown', startDragging);
        timeline.value.addEventListener('touchstart', startDragging);

        window.addEventListener('message', handleMessage);
    });

    onUnmounted(() => {
        timeline.value.removeEventListener('mousedown', startDragging);
        timeline.value.removeEventListener('touchstart', startDragging);
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
            position: relative;
            width: 100%;
            height: 4px;
            border-top: 4px dotted $primary;
            cursor: pointer;
        }

        &__range {
            display: block;
            position: absolute;
            width: 5rem;
            height: 0.875rem;
            background-color: $primary;
            top: -8.5px;
            left: 0;
            cursor: grab;

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