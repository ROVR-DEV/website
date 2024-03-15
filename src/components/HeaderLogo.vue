<template>
    <div class="header__logo" :class="{ 'header__logo--sticky': sticky }" @click="handleLogoClick">
        <video v-show="logoOriginal" playsinline autoplay muted preload="none" ref="logoOn">
            <source src="@/assets/images/logo/player_logo.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <video v-show="logoSticky" playsinline autoplay muted preload="none" ref="logoOff">
            <source src="@/assets/images/logo/player_logo_off.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
</template>

<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';
    import { useRouter, useRoute } from 'vue-router';

    const emit = defineEmits(['pressed']);

    const router = useRouter();
    const route  = useRoute();

    const playerStore = usePlayerStore();

    const logoOriginal = ref(true);
    const logoSticky   = ref(false);
    const logoOn       = ref(null);
    const logoOff      = ref(null);
    const sticky       = ref(false);

    onMounted(() => {
        logoOn.value.addEventListener('loadedmetadata', () => {
            logoOn.value.currentTime = 0;
            logoOn.value.play();
            setTimeout(() => {
                logoOn.value.pause();
            }, 10);
        });
    });

    const handleLogoClick = () => {
        router.push({ name: 'radio' });
        emit('pressed');
    }

    watch(route, () => {
        if (router.currentRoute.value.name !== 'radio' && playerStore.isPlaying) {
            if (!logoSticky.value) {
                logoOn.value.play();

                logoOn.value.addEventListener('ended', () => {
                    playerStore.toggleStickyPlayer(true);
                    logoOriginal.value = false;
                    logoSticky.value = true;
                    logoOff.value.currentTime = 0;
                    logoOff.value.play();
                    setTimeout(() => {
                        logoOff.value.pause();
                        logoOff.value.currentTime = 0;
                    }, 100);
                });
            }
        } else {
            if (playerStore.isPlaying) {
                playerStore.toggleStickyPlayer(false);

                setTimeout(() => {
                    logoOff.value.play();
                }, 500);

                logoOff.value.addEventListener('ended', () => {
                    logoOriginal.value = true;
                    logoSticky.value = false;

                    logoOn.value.currentTime = 0;
                    logoOn.value.play();
                    setTimeout(() => {
                        logoOn.value.pause();
                        logoOn.value.currentTime = 0;
                    }, 100);
                });
            }
        }
    });

    watch(() => playerStore.isPlaying, (status) => {
        if (!status && playerStore.show_sticky_player) {
            playerStore.toggleStickyPlayer(false);
                
            setTimeout(() => {
                logoOff.value.play();
            }, 500);

            logoOff.value.addEventListener('ended', () => {
                logoOriginal.value = true;
                logoSticky.value = false;

                logoOn.value.currentTime = 0;
                logoOn.value.play();
                setTimeout(() => {
                    logoOn.value.pause();
                    logoOn.value.currentTime = 0;
                }, 100);
            });
        } else if (status && !playerStore.show_sticky_player && router.currentRoute.value.name !== 'radio') {
            logoOn.value.play();

            logoOn.value.addEventListener('ended', () => {
                playerStore.toggleStickyPlayer(true);
                logoOriginal.value = false;
                logoSticky.value = true;
                logoOff.value.currentTime = 0;
                logoOff.value.play();
                setTimeout(() => {
                    logoOff.value.pause();
                    logoOff.value.currentTime = 0;
                }, 100);
            });
        }
    });

    watch(() => playerStore.show_sticky_player, (status) => {
        if(status) {
            sticky.value = !sticky.value;
        } else {
            setTimeout(() => sticky.value = !sticky.value, 500);
        }
    });
</script>

<style lang="scss" scoped>
    .header__logo {
        cursor: pointer;
        margin-right: 0.75rem;
        height: 3.25rem;
        overflow: hidden;
        * {
            width: 9rem;
            height: 3.25rem;
            position: relative;
        }
        &--sticky {
            width: 3rem;
        }
    }

    video {
        &::-webkit-media-controls,
        &::-webkit-media-controls-play-button,
        &::-webkit-media-controls-volume-slider,
        &::-webkit-media-controls-mute-button,
        &::-webkit-media-controls-timeline,
        &::-webkit-media-controls-current-time-display {
            display: none;
        }
    }
</style>