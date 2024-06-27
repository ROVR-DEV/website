<template>
    <div class="current-track">
        <p>Track:</p>
        <div class="current-track__info" :class="{
            'current-track__info--fade-in': isAnimating && playerStore.isPlaying,
            'current-track__info--fade-out': isAnimating && !playerStore.isPlaying
        }" :style="opacity">
            <marquee-text marqueeClass="current-track__artist" :text="trackArtist" />
            <marquee-text marqueeClass="current-track__title" :text="trackTitle" />
            <em v-text="trackLabel" class="current-track__label" />
        </div>
    </div>
</template>

<script setup>
    import { usePlayerStore } from '@/stores/player';
    import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import MarqueeText from './MarqueeText.vue';

    const playerStore = usePlayerStore();
    const isAnimating = ref(false);
    const route = useRoute();
    const router = useRouter();

    const trackArtist = ref('Artist');
    const trackTitle = ref('Title');
    const trackLabel = ref('Label');

    const props = defineProps({
        type: {
            type: String,
            required: true,
        },
        archive_id: {
            type: Number,
            required: false
        }
    });

    watch(() => playerStore.isPlaying, (newState, oldState) => {
        if (playerStore.source === props.type) {
            if (newState) {
                trackArtist.value = playerStore.track.artist;
                trackTitle.value = playerStore.track.title;
                trackLabel.value = playerStore.track.label;
            } else {
                setTimeout(() => {
                    trackArtist.value = 'Artist';
                    trackTitle.value = 'Title';
                    trackLabel.value = 'Label';
                }, 800);
            }

            if (playerStore.source === 'archive' && playerStore.now_playing_archive !== props.archive_id) {
                playerStore.updateTrack('Incoming...', 'ROVR', '');
            } else {
                animateTrackInfo();
            }
        }
    });

    watch(() => playerStore.isPlaying, (state) => {
        if (!state) {
            setTimeout(() => {
                trackArtist.value = 'Artist';
                trackTitle.value = 'Title';
                trackLabel.value = 'Label';
            }, 800);
        }
    });

    const animateTrackInfo = () => {
        isAnimating.value = true;
        setTimeout(() => {
            isAnimating.value = false;
        }, 1500);
    }


    watch(() => playerStore.track, () => {
        if (playerStore.isPlaying && playerStore.source === props.type) {
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
        const isRadio = playerStore.source === 'radio';
        const isPlaying = playerStore.isPlaying && playerStore.source === props.type;

        if (isRadio) {
            return { opacity: isPlaying ? '1' : '0.32' };
        } else {
            return { opacity: isPlaying && playerStore.now_playing_archive === props.archive_id ? '1' : '0.32' };
        }
    });

    watch(route, () => {
        if (router.currentRoute.value.name === 'show' && playerStore.isPlaying && playerStore.source === 'archive' && playerStore.now_playing_archive !== props.archive_id) {
            trackArtist.value = 'Artist';
            trackTitle.value = 'Title';
            trackLabel.value = 'Label';
        }
    });

    const handleMessage = (event) => {
        const { action } = event.data;

        if (action === 'reset_metadata') {
            setTimeout(() => {
                trackArtist.value = 'ROVR';
                trackTitle.value = 'Incoming...';
                trackLabel.value = '';
            }, 375);
        }
    }

    onMounted(() => {
        window.addEventListener('message', handleMessage);
    });

    onUnmounted(() => {
        window.removeEventListener('message', handleMessage);
    });
</script>

<style lang="scss">
    .current-track {
        display: flex;
        background-color: $primary;
        padding: 2rem 3.75rem;
        height: 10rem;

        &>p {
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