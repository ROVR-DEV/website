<template>
    <play-button archive/>

    <div class="archive-player">
        <img src="@/assets/images/icons/soundcloud.svg" class="archive-player__icon" alt="soundcloud" @click="abc()">

        <div class="archive-player__timeline">
            <span class="archive-player__range"/>
        </div>

        <iframe :src="`../../../player/player.html?url=${soundcloud_secret}`" ref="iframe" width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay"></iframe>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';
    import PlayButton from '../ui/PlayButton.vue';

    const iframe = ref(null);
    const playerStore = usePlayerStore();

    watch(() => playerStore.isPlaying, () => {
        if(playerStore.source === 'archive' && iframe.value) {
            iframe.value.contentWindow.postMessage({ action: 'togglePlayer' }, '*');
        }
    });

    defineProps({
        soundcloud_secret: {
            type: String,
            required: true
        }
    });
</script>

<style lang="scss" scoped>
    .archive-player {
        @include flex-center;
        position: relative;
        flex: auto;
        margin-left: 2.5rem;
        iframe {
            display: none;
        }
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
        }
        &__range {
            display: block;
            position: absolute;
            width: 5rem;
            height: 0.875rem;
            background-color: $primary;
            top: -9px;
            left: 0;
        }
    }
</style>