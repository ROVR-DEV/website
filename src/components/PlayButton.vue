<template>
    <button
        class="player-button"
        :class="{ 'player-button--stop': isPlaying, 'player-button--play': !isPlaying, 'player-button--ready': isPlayerReady }"
        v-press="{ time: 150, scale: 0.96 }"
        @click="play(isPlayerReady, 150)"/>
</template>

<script setup>
    import { ref } from 'vue';

    const isPlaying = ref(false);
    const emit = defineEmits(['play', 'stop']);

    defineProps({
        isPlayerReady: {
            type: Boolean,
            required: true,
        }
    });

    const play = (isPlayerReady, delay) => {
        if(isPlayerReady) {
            setTimeout(() => {
                isPlaying.value = !isPlaying.value;
                isPlaying.value ? emit('play') : emit('stop');
            }, delay);
        } else {
            console.log('not ready yet');
        }
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
        height: 6.25rem;
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
    }
</style>