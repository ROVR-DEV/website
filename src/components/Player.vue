<!-- eslint-disable vue/valid-template-root -->
<template>
    <audio :src="playerStore.stream_url" preload="none" ref="player" crossorigin="anonymous" controls hidden></audio>

    <transition name="fade">
        <div class="preloader" v-if="!ready">
            <img src="@/assets/images/logo/start_animation.gif" alt="">
        </div>
    </transition>
</template>

<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';
    import jingleTrack from '@/assets/media/jingle.mp3';

    const ready = ref(false);

    const player = ref(null);
    const playerStore = usePlayerStore();
    const playerTime = ref(0);
    const jingle = new Audio(jingleTrack);

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioContext.createGain();


    watch(() => playerStore.stream_url, (state) => {
        if (state) setInterval(() => playerTime.value++, 1000);
    });

    watch(() => playerStore.isPlaying, (state) => {
        state ? play() : pause();
    });

    watch(() => playerStore.isFinished, (state) => {
        if (state) finish();
    });

    watch(() => playerStore.track, () => setWidget(), { deep: true });

    onMounted(() => {
        setTimeout(() => {
            ready.value = true;
        }, 4000);

        gainNode.gain.value = 1;
        const source = audioContext.createMediaElementSource(player.value);
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
    });

    const play = () => {
        //player.value.load(playerStore.stream_url);
        player.value.play();
        player.value.currentTime = playerTime.value;
        navigator.mediaSession.playbackState = "playing";
        setWidget();

        // Playing jinlge for 1 ms to prevent mobile audio security
        setTimeout(() => {
            jingle.play();
            setTimeout(() => {
                jingle.pause();
                jingle.currentTime = 0;
            }, 10);
        }, 1000);
    }

    const pause = () => {
        player.value.pause();
        navigator.mediaSession.playbackState = "paused";
    }

    const finish = () => {
        if (!player.value.paused) {
            startFadeOut();
            playerStore.setFinished(true);
            setTimeout(() => jingle.play(), 2000);
            setTimeout(() => {
                player.value.load(playerStore.stream_url);
                playerTime.value = 0;
            }, 5000);

            jingle.onended = () => {
                jingle.pause();
                jingle.currentTime = 0;
                player.value.play();
                player.value.currentTime = playerTime.value;
                gainNode.gain.value = 1;
                playerStore.setFinished(false);
            }
        }
    }

    function startFadeOut() {
        const initialVolume = gainNode.gain.value;
        const targetVolume = 0;
        const fadeSteps = 100;
        const fadeInterval = 2000 / fadeSteps;
        const volumeStep = (initialVolume - targetVolume) / fadeSteps;

        const fadeOutInterval = setInterval(() => {
            gainNode.gain.value -= volumeStep;
            if (gainNode.gain.value <= targetVolume) {
                clearInterval(fadeOutInterval);
                player.value.pause();
                player.value.currentTime = 0;
            }
        }, fadeInterval);
    }


    const setWidget = () => {
        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: playerStore.track.title,
                artist: playerStore.track.artist,
                artwork: [
                    {
                        src: playerStore.track.cover,
                        sizes: "96x96",
                        type: "image/png",
                    },
                    {
                        src: playerStore.track.cover,
                        sizes: "128x128",
                        type: "image/png",
                    },
                    {
                        src: playerStore.track.cover,
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: playerStore.track.cover,
                        sizes: "256x256",
                        type: "image/png",
                    },
                    {
                        src: playerStore.track.cover,
                        sizes: "384x384",
                        type: "image/png",
                    },
                    {
                        src: playerStore.track.cover,
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            });
        }
    }
</script>

<style lang="scss" scoped>
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 50;
        @include flex-center;
        background-color: $black;
        img {
            width: 20rem;
        }
    }

    audio {
        position: absolute;
        z-index: 50;
    }
</style>