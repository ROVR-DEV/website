<template>
    <iframe
        v-if="playerStore.soundcloud_secret"
        :src="`../../../player/player.html?url=${playerStore.soundcloud_secret}`"
        ref="iframe"
        width="400"
        scrolling="no"
        frameborder="no"
        allow="autoplay"/>
</template>

<script setup>
    import { ref, watch, onMounted, onUnmounted } from 'vue';
    import { usePlayerStore } from '@/stores/player';

    const iframe = ref(null);
    const duration = ref(null);
    const position = ref(0);
    const playerStore = usePlayerStore();

    watch(() => playerStore.isPlaying, (isPlaying) => {
        if (iframe.value) {
            if (isPlaying && playerStore.source === 'archive') {
                play();
            } else if (!isPlaying && playerStore.source === 'archive') {
                pause();
            }
        }
    });

    watch(() => playerStore.source, (source) => {
        if (iframe.value) {
            source !== 'archive' ? pause() : play();
        }
    });

    onMounted(() => {
        window.addEventListener('message', handleMessage);
    });

    onUnmounted(() => {
        window.removeEventListener('message', handleMessage);
    });

    const handleMessage = (event) => {
        const { action, value } = event.data;

        switch (action) {
            case 'duration':
                duration.value = value;
                break;
            case 'seekTo':
                seekTo(value);
                break;
            case 'position':
                position.value = value;
                break;
            case 'finish':
                finish();
                break;
        }
    }

    const play = () => {
        iframe.value.contentWindow.postMessage({ action: 'play' }, '*');
        if(Math.round(position.value / 1000) < 16 && playerStore.source === 'archive') {
            playerStore.updateTrack('Incoming...', 'ROVR', '');
        }
    }

    const pause = () => {
        iframe.value.contentWindow.postMessage({ action: 'pause' }, '*');
    }

    const seekTo = (position) => {
        iframe.value.contentWindow.postMessage({ action: 'seekTo', value: position }, '*');
    }

    const finish = () => {
        playerStore.pause();
        playerStore.setFinished('archive', true);
    }
</script>

<style lang="scss" scoped>
    iframe {
        display: block;
        position: absolute;
        top: 300px;
        z-index: 5;
        opacity: 1;
        width: 100%;
    }
</style>