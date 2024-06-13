<template>
    <div class="current-track">
        <p>Track:</p>
        <div
            class="current-track__info"
            :class="{
                'current-track__info--fade-in': isAnimating && playerStore.isPlaying,
                'current-track__info--fade-out': isAnimating && !playerStore.isPlaying
            }"
            :style="opacity">
                <marquee-text marqueeClass="current-track__artist" :text="trackArtist"/>
                <marquee-text marqueeClass="current-track__title" :text="trackTitle"/>
                <em v-text="trackLabel" class="current-track__label"/>
        </div>
    </div>
</template>

<script setup>
    import { usePlayerStore } from '@/stores/player';
    import { ref, watch, computed } from 'vue';
    import MarqueeText from './MarqueeText.vue';

    const playerStore = usePlayerStore();
    const isAnimating = ref(false);

    const trackArtist = ref('Artist');
    const trackTitle  = ref('Title');
    const trackLabel  = ref('Label');

    const props = defineProps({
        type: {
            type: String,
            required: true,
        }
    })

    watch(() => playerStore.isPlaying, (state) => {
        if(state && playerStore.source === props.type) {
            trackArtist.value = playerStore.track.artist;
            trackTitle.value  = playerStore.track.title;
            trackLabel.value  = playerStore.track.label;

            isAnimating.value = true;
            setTimeout(() => isAnimating.value = false, 1500);
        } else {
            setTimeout(() => {
                trackArtist.value = 'Artist';
                trackTitle.value  = 'Title';
                trackLabel.value  = 'Label';
            }, 800);
        }
    });

    watch(() => playerStore.track, () => {
        if(playerStore.isPlaying && playerStore.source === props.type) {
            trackArtist.value = playerStore.track.artist;
            trackTitle.value = playerStore.track.title;
            trackLabel.value = playerStore.track.label;
        } else {
            trackArtist.value = 'Artist';
            trackTitle.value = 'Title';
            trackLabel.value = 'Label';
        }
    }, { deep: true });

    const opacity = computed(() => {
        if (isAnimating.value) {
            return { opacity: playerStore.isPlaying && playerStore.source === props.type ? '1' : '0.32' };
        } else {
            return { opacity: playerStore.isPlaying && playerStore.source === props.type ? '1' : '0.32' };
        }
    });
</script>

<style lang="scss">
    .current-track {
        display: flex;
        background-color: $primary;
        padding: 2rem 3.75rem;
        height: 10rem;
        & > p {
            @include font-size(20px);
            color: rgba($color: $black, $alpha: 0.32);
            font-weight: bold;
            line-height: normal;
            margin: 0 3rem 0 0;
        }
        &__info {
            opacity: 0.32;
            &--fade-in {
                animation: fade-in 1.5s linear;
            }
            &--fade-out {
                animation: fade-out 1.5s linear;
            }
            * {
                @include font-size(20px);
                display: block;
                color: $black;
                margin: 0;
                height: 1.325rem;
                &:not(:last-child) {
                    margin-bottom: 1rem;
                }
            }
        }
        &__artist {
            font-weight: bold;
        }
        &__label {
            font-family: 'GT Alpina', sans-serif;
            font-style: italic;
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fade-out {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 0.32;
        }
    }
</style>