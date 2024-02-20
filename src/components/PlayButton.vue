<template>
    <button
        class="player-button"
        :class="{ 
            'player-button--stop': playerStore.isPlaying,
            'player-button--play': !playerStore.isPlaying,
            'player-button--ready': playerStore.isPlayerReady,
            'player-button--disabled' : isTouchEventDisabled
        }"
        v-press="{ time: 150, scale: 0.96 }"
        @click="play(150)"/>
</template>

<script setup>
    import { usePlayerStore } from '@/stores/player';
import { ref } from 'vue';

    const playerStore = usePlayerStore();
    const isTouchEventDisabled = ref(false);

    const play = (delay) => {
        if(playerStore.isPlayerReady) {
            setTimeout(() => playerStore.togglePlaying(), delay);
        }
        isTouchEventDisabled.value = true;
        setTimeout(() => isTouchEventDisabled.value = false, 1000);
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
        width: 6.25rem;
        aspect-ratio: 1;
        padding: 0;
        filter: brightness(0.5);
        cursor: not-allowed;
        &:after {
            content: '';
            width: 2.5rem;
            height: 2.5rem;
        }
        &--play:after {
            border: 1.25rem solid transparent;
            border-left: 2.25rem solid $black;
            position: relative;
            left: 0.938rem;
        }
        &--stop:after {
            background-color: $black;
        }
        &--ready {
            filter: brightness(1);
            cursor: pointer;
        }
        &--disabled {
            pointer-events: none;
        }
    }
</style>