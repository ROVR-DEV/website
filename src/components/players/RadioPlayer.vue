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
    import { onMounted, ref, watch, computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { usePlayerStore } from '@/stores/player';
    import { useRadioStore } from '@/stores/radio';
    import PreloaderLogo from '@/components/animated_svg/PreloaderLogo.vue';
    import jingleTrack from '@/assets/media/jingle.mp3';

    const router = useRouter();
    const route  = useRoute();

    const ready = ref(false);
    const player = ref(null);
    const playerStore = usePlayerStore();
    const radioStore = useRadioStore();
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
        if (state && playerStore.source === 'radio') {
            play();
        } else {
            pause();
        }
    });

    watch(() => playerStore.source, (newSource, oldSource) => {
        if(player.value && oldSource !== null) {
            newSource !== 'radio' ? pause() : play();
        }
    });

    watch(() => playerStore.fade_out, (state) => {
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
        playerStore.updateTrack(radioStore.radio.title, radioStore.radio.artist, radioStore.radio.label, metadataCover);
        navigator.mediaSession.playbackState = "playing";
        setWidget();
        playerStore.isReady = true

        // Playing jinlge for 1 ms to prevent mobile audio security
        setTimeout(() => {
            jingle.play();
            setTimeout(() => {
                jingle.pause();
                jingle.currentTime = 0;
            }, 20);
        }, 500);
    }

    const pause = () => {
        player.value.pause();
        jingle.pause();
        navigator.mediaSession.playbackState = "paused";
    }

    const finish = () => {
        if (!player.value.paused) {
            startFadeOut();

            setTimeout(() => {
                playerStore.setFadeOut(false);
                playerStore.setFinished('radio', true);
                jingle.play();
            }, 5000);

            setTimeout(() => {
                player.value.load(playerStore.stream_url);
                player.value.play();
                player.value.volume = 0;
            }, 6000);

            jingle.onended = () => {
                jingle.pause();
                jingle.currentTime = 0;
                player.value.volume = 1;
                playerStore.setFinished('radio', false);
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
        }, 50);
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

    // replacing radio cover (backend bug)
    const metadataCover = computed(() => {
        const replaceCover = {
            localhost: 'app.rovr.live',
            lp: 'app'
        }

        if (radioStore.radio) {
            if (radioStore.radio.show.cover_app_radio) {
                return radioStore.radio.show.cover_app_radio.replace(/localhost|lp/gi, (matched) => replaceCover[matched]);
            }
        }

        return radioStore.radio.show.cover_mobile ?? radioStore.radio.show.cover;
    });
</script>

<style lang="scss" scoped>
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 50;
        background-color: $black;
        & > * {
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -45%);
        }
    }
</style>