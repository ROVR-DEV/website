<template>
    <play-button archive />

    <div class="archive-player">
        <img src="@/assets/images/icons/soundcloud.svg" class="archive-player__icon" alt="soundcloud">

        <div class="archive-player__timeline" ref="timeline" @mousedown="startDragging" @touchstart="startDragging">
            <span class="archive-player__range" ref="range" />
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import PlayButton from '../ui/PlayButton.vue';

    const duration = ref(0);
    const timeline = ref(null);
    const range = ref(null);
    const isDragging = ref(false);
    const startX = ref(0);
    const startLeft = ref(0);

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
    }

    const updateRangePosition = (position) => {
        if(!isDragging.value) {
            const timelineWidth = timeline.value.offsetWidth;
            const newLeft = (position / duration.value) * timelineWidth;
            range.value.style.left = `${newLeft}px`;
        }
    }

    const seekTo = (position) => {
        window.parent.postMessage({ action: 'seekTo', value: position }, '*');
    }

    const handleMessage = (event) => {
        const { action, value } = event.data;
        switch(action) {
            case 'duration':
                duration.value = value;
                break;
            case 'position':
                updateRangePosition(value);
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
            top: -9px;
            left: 0;
            cursor: grab;
        }

        &__range.grabbing {
            cursor: grabbing;
        }
    }

    body.grabbing {
        cursor: grabbing;
    }
</style>