<!-- eslint-disable vue/valid-template-root -->
<template>
    <teleport to="#modal">
        <transition name="fade" v-if="!route.query.webview">
            <div class="preloader" v-if="!ready">
                <preloader-logo/>
            </div>
        </transition>
        
    </teleport>
</template>

<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { usePlayerStore } from '@/stores/player';
    import PreloaderLogo from './animated_svg/PreloaderLogo.vue';
    import jingleTrack from '@/assets/media/jingle.mp3';

    const router = useRouter();
    const route  = useRoute()

    const ready = ref(false);
    const player = ref(null);
    const playerStore = usePlayerStore();
    const jingle = new Audio(jingleTrack);

    watch(() => playerStore.stream_url, (state) => {
        if (state) {
            player.value = new Audio(playerStore.stream_url);
            player.value.addEventListener('playing', () => {
                playerStore.setLoading(false);
            });
        }
    });

    watch(() => playerStore.isPlaying, (state) => {
        state ? play() : pause();
    });

    watch(() => playerStore.isFinished, (state) => {
        if (state) finish();
    });

    watch(() => playerStore.track, () => setWidget(), { deep: true });

    onMounted(async () => {
        await router.isReady();

        setTimeout(() => ready.value = true, 4000);
    });

    const play = () => {
        player.value.load(playerStore.stream_url);
        player.value.play();
        playerStore.setLoading(true);
        navigator.mediaSession.playbackState = "playing";
        setWidget();

        // Playing jinlge for 1 ms to prevent mobile audio security
        setTimeout(() => {
            jingle.play();
            setTimeout(() => {
                jingle.pause();
                jingle.currentTime = 0;
            }, 10);
        }, 500);
    }

    const pause = () => {
        player.value.pause();
        navigator.mediaSession.playbackState = "paused";
    }

    const finish = () => {
        if (!player.value.paused) {
            if(getMobileOS() === 'iOS') {
                player.value.pause();
                jingle.play();
            } else {
                startFadeOut();
                playerStore.setFinished(true);
                setTimeout(() => jingle.play(), 2000);
                setTimeout(() => {
                    player.value.load(playerStore.stream_url);
                    player.value.play();
                    player.value.volume = 0;
                }, 3000);
            }

            jingle.onended = () => {
                jingle.pause();
                jingle.currentTime = 0;
                player.value.volume = 1;
                playerStore.setFinished(false);
            }
        }
    }

    const fadeOutInterval = ref(null);

    const startFadeOut = () => {
        fadeOutInterval.value = setInterval(() => {
            player.value.volume -= 0.01;
            if (player.value.volume <= 0.01) {
                player.value.pause();
                player.value.volume = 0;
                clearInterval(fadeOutInterval.value);
            }
        }, 20);
    }

    const getMobileOS = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
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
        @include flex-center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 50;
        background-color: $black;
    }
</style>