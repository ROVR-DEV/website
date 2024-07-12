<template>
    <div class="sticky-player">
        <div class="sticky-player__info" @click="handleClick">
            <span class="sticky-player__source" v-text="playerStore.source"/>
            <marquee-text marqueeClass="sticky-player__track">
                {{ playerStore.track.title }} <strong>by {{ playerStore.track.artist }}</strong>
            </marquee-text>
            <em class="sticky-player__label" v-if="playerStore.track.label" v-text="playerStore.track.label"/>
        </div>

        <button class="sticky-player__stop" @click="playerStore.stop();"/>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { usePlayerStore } from '@/stores/player';
    import MarqueeText from './MarqueeText.vue';

    const router = useRouter();
    const playerStore = usePlayerStore();

    const handleClick = () => {
        if (playerStore.source === 'archive' && playerStore.isPlaying) {
            router.push(`/show/${playerStore.now_playing_archive}`);
        } else {
            router.push({ name: 'radio' });
        }
    }
</script>

<style lang="scss">
    .sticky-player {
        @include flex-center-sb;
        margin-right: auto;
        &__source {
            @include font-size(14px);
            display: block;
            color: $primary;
            font-weight: bold;
            text-transform: uppercase;
            line-height: 1;
            margin-bottom: 0.25rem;
        }
        &__info {
            position: relative;
            width: 100%;
            margin-right: 1rem;
            max-width: 23rem;
            cursor: pointer;
        }
        .marquee-container {
            line-height: 0;
        }
        &__track {
            @include font-size(14px);
            margin: 0;
            color: $white;
            font-weight: normal;
            line-height: 1;
            strong {
                color: inherit;
                font-size: inherit;
                font-weight: bold;
            }
        }
        &__label {
            @include font-size(12px);
            margin: 0.25rem 0 0 0;
            display: block;
            font-family: 'GT Alpina', sans-serif;
            font-style: italic;
            color: $white;
        }
        &__stop {
            @include flex-center;
            border-radius: 50%;
            background-color: $primary;
            color: $black;
            position: relative;
            flex: 1 0 38px;
            aspect-ratio: 1;
            cursor: pointer;
            &::after {
                content: "";
                background-color: $black;
                width: 14px;
                aspect-ratio: 1;
            }
            @media screen and (max-width: 1660px) {
                flex: 1 0 30px;
            }
        }
    }
</style>