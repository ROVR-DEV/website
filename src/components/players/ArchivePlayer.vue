<template>
    <iframe
        v-if="playerStore.soundcloud_secret"
        :src="`../../../player/player.html?url=${playerStore.soundcloud_secret}`"
        ref="iframe"
        scrolling="no"
        frameborder="no"
        allow="autoplay"/>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';

    const iframe = ref(null);
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
        if(iframe.value) {
            source !== 'archive' ? pause() : play();
        }
    });

    const play = () => {
        iframe.value.contentWindow.postMessage({ action: 'play' }, '*');
        playerStore.updateTrack('Title', 'Artist', 'Label',);
    }

    const pause = () => {
        iframe.value.contentWindow.postMessage({ action: 'pause' }, '*');
    }
</script>

<style lang="scss" scoped>
    iframe {
        display: none;
    }
</style>