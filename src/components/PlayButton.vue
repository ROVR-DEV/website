<template>
    <button
        class="player-button"
        :class="{ 'player-button--disabled' : isTouchEventDisabled, 'player-button--loading' : playerStore.isLoading }"
        v-press="{ time: 150, scale: 0.96 }"
        @click="play(150)">
        <img v-show="!playerStore.isPlaying" src="@/assets/images/icons/play_button.svg" alt="play">
        <img v-show="playerStore.isPlaying" src="@/assets/images/icons/stop_button.svg" alt="play">
    </button>
</template>

<script setup>
    import { ref } from 'vue';
    import { usePlayerStore } from '@/stores/player';

    const playerStore = usePlayerStore();
    const isTouchEventDisabled = ref(false);

    const play = (delay) => {
        setTimeout(() => {
            playerStore.togglePlaying();
        }, delay);
        
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

        @media screen and (max-width: 1600px) {
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