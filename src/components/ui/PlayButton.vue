<template>
    <button
        class="player-button player-button--radio"
        :class="{ 'player-button--disabled' : isTouchEventDisabled, 'player-button--loading' : playerStore.isLoading }"
        v-press="{ time: 150, scale: 0.96 }"
        @click="play(150)">
        <img v-show="!playerStore.isPlaying" src="@/assets/images/ui/play_button.svg" alt="play">
        <img v-show="archive && playerStore.isPlaying && playerStore.source === 'radio'" src="@/assets/images/ui/play_button.svg" alt="play">
        <img v-show="!archive && playerStore.isPlaying && playerStore.source === 'radio'" src="@/assets/images/ui/stop_button.svg" alt="play">
        <img v-show="archive && playerStore.isPlaying && playerStore.source === 'archive'" src="@/assets/images/ui/pause_button.svg" alt="play">
    </button>
</template>

<script setup>
    import { ref } from 'vue';
    import { usePlayerStore } from '@/stores/player';

    const playerStore = usePlayerStore();
    const isTouchEventDisabled = ref(false);

    const props = defineProps({
        archive: {
            type: Boolean,
            required: false
        }
    });

    const play = (delay) => {
        if(!props.archive) {
            setTimeout(() => {
                playerStore.togglePlaying('radio');
            }, delay);
        } else {
            setTimeout(() => {
                playerStore.togglePlaying('archive');
            }, delay);
        }

        isTouchEventDisabled.value = true;
        setTimeout(() => isTouchEventDisabled.value = false, 2500);
    }
</script>

<style lang="scss" scoped>
    .player-button {
        @include flex-center;
        border: none;
        outline: none;
        border-radius: 50%;
        background: $primary;
        color: $black;
        width: 6rem;
        aspect-ratio: 1;
        padding: 0;
        cursor: pointer;
        &--disabled {
            pointer-events: none;
        }
        &--loading {
            animation: pulse 1s infinite ease-in-out alternate;
        }

        @media screen and (max-width: 1660px) {
            width: 6.25rem;
        }
    }

    @keyframes pulse {
        from {
            transform: scale(1);
        }

        to {
            transform: scale(1.05);
        }
    }
</style>