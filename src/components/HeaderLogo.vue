<template>
    <div class="header__logo" :class="{ 'header__logo--sticky': sticky }" @click="handleLogoClick">
        <sticky-logo/>
    </div>
</template>

<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';
    import { useRouter, useRoute } from 'vue-router';
    import StickyLogo from './animated_svg/StickyLogo.vue';

    const playerStore = usePlayerStore();

    const router = useRouter();
    const route = useRoute();

    const emit = defineEmits(['pressed']);

    const sticky = ref(false);

    watch(route, () => {
        if(playerStore.source === 'radio' && playerStore.isPlaying) {
            if (router.currentRoute.value.name !== 'radio') {
                if (!sticky.value) {
                    collapse();
                    setTimeout(() => playerStore.toggleStickyPlayer(true), 1000);
                }
            } else {
                if (playerStore.isPlaying) {
                    playerStore.toggleStickyPlayer(false);
                    setTimeout(() => expand(), 1000);
                }
            }
        } else if(playerStore.source === 'archive' && playerStore.isPlaying) {
            if (router.currentRoute.value.name !== 'show' || (router.currentRoute.value.name === 'show' && +router.currentRoute.value.params.publisher_id !== playerStore.now_playing_archive)) {
                if (!sticky.value) {
                    collapse();
                    setTimeout(() => playerStore.toggleStickyPlayer(true), 1000);
                }
            } else {
                if (playerStore.isPlaying) {
                    playerStore.toggleStickyPlayer(false);
                    setTimeout(() => expand(), 1000);
                }
            }
        }
    });

    watch(() => playerStore.isPlaying, (status) => {
        if (!status && playerStore.show_sticky_player) {
            playerStore.toggleStickyPlayer(false);
            setTimeout(() => expand(), 500);
        } else if (status && !playerStore.show_sticky_player && (router.currentRoute.value.name !== 'radio' && router.currentRoute.value.name !== 'show')) {
            collapse();
            setTimeout(() => playerStore.toggleStickyPlayer(true), 1000);
        }
    });

    watch(() => playerStore.source, (newSource, oldSource) => {
        if (playerStore.isPlaying && playerStore.show_sticky_player && newSource !== oldSource) {
            playerStore.toggleStickyPlayer(false);
            setTimeout(() => expand(), 500);
        }
    });

    watch(() => playerStore.show_sticky_player, (status) => {
        if (status) {
            sticky.value = !sticky.value;
        } else {
            setTimeout(() => sticky.value = !sticky.value, 500);
        }
    });

    let letR2_collapse;
    let letR2_expand;
    let letV_collapse;
    let letV_expand;
    let letO_collapse;
    let letO_expand;
    let letTM_collapse;
    let letTM_expand;

    onMounted(async () => {
        await router.isReady();

        letR2_collapse = document.getElementById('letter-r2-collapse');
        letR2_expand   = document.getElementById('letter-r2-expand');
        letV_collapse  = document.getElementById('letter-v-collapse');
        letV_expand    = document.getElementById('letter-v-expand');
        letO_collapse  = document.getElementById('letter-o-collapse');
        letO_expand    = document.getElementById('letter-o-expand');
        letTM_collapse = document.getElementById('letter-tm-collapse');
        letTM_expand   = document.getElementById('letter-tm-expand');
    });

    const collapse = () => {
        letR2_collapse.beginElement();
        letV_collapse.beginElement();
        letO_collapse.beginElement();
        letTM_collapse.beginElement();
    }

    const expand = () => {
        letR2_expand.beginElement();
        letV_expand.beginElement();
        letO_expand.beginElement();
        letTM_expand.beginElement();
    }

    const handleLogoClick = () => {
        emit('pressed');
    }
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
</style>