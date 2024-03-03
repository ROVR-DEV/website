<template>
    <div class="header__logo" :class="{ 'header__logo--sticky': logoSticky }" @click="router.push({ name: 'radio' }); isBurgerActive = false">
        <img v-show="logoOriginal" src="@/assets/images/logo/logo.svg" alt="Logo">
        <video v-show="logoGif" playsinline autoplay muted preload="none" ref="logoVideo">
            <source src="@/assets/images/logo/player_logo.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <video v-show="logoGifOff" playsinline autoplay muted preload="none" ref="logoVideoOff">
            <source src="@/assets/images/logo/player_logo_off.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <img v-show="logoSticky" src="@/assets/images/logo/logo_sticky.svg" alt="Logo">
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';
    import { useRouter, useRoute } from 'vue-router';

    const router = useRouter();
    const route = useRoute();

    const playerStore = usePlayerStore();

    const logoOriginal = ref(true);
    const logoSticky = ref(false);
    const logoGif = ref(false);
    const logoGifOff = ref(false);

    const logoVideo = ref(null);
    const logoVideoOff = ref(null);

    watch(route, () => {
        if (router.currentRoute.value.name !== 'radio' && playerStore.isPlaying) {
            if (!logoSticky.value) {
                logoOriginal.value = false;
                logoGif.value = true;
                logoVideo.value.play();
                logoVideo.value.addEventListener('ended', () => {
                    logoGif.value = false;
                    logoSticky.value = true;
                    playerStore.toggleStickyPlayer(true);
                });
            }
        } else {
            if (playerStore.isPlaying) {
                playerStore.toggleStickyPlayer(false);
                setTimeout(() => {
                    logoSticky.value = false;
                    logoGifOff.value = true;
                    logoVideoOff.value.play();
                }, 500);
                logoVideoOff.value.addEventListener('ended', () => {
                    logoGifOff.value = false;
                    logoOriginal.value = true;
                });
            }
        }
    });

    watch(() => playerStore.isPlaying, (status) => {
        if (!status && playerStore.show_sticky_player) {
            playerStore.toggleStickyPlayer(false);
            setTimeout(() => {
                logoSticky.value = false;
                logoGifOff.value = true;
                logoVideoOff.value.play();
            }, 500);
            logoVideoOff.value.addEventListener('ended', () => {
                logoGifOff.value = false;
                logoOriginal.value = true;
            });
        } else if (status && !playerStore.show_sticky_player && router.currentRoute.value.name !== 'radio') {
            logoOriginal.value = false;
            logoGif.value = true;
            logoVideo.value.play();
            logoVideo.value.addEventListener('ended', () => {
                logoGif.value = false;
                logoSticky.value = true;
                playerStore.toggleStickyPlayer(true);
            });
        }
    });
</script>

<style lang="scss" scoped>
    .header__logo {
        cursor: pointer;
        margin-right: 0.75rem;
        height: 3.25rem;
        * {
            width: 9rem;
            height: 3.25rem;
        }
        &--sticky {
            * {
                width: auto;
            }
        }
    }
</style>