<template>
    <button class="close-button" v-if="showBackButton" @click="$router.back()">
        <img src="@/assets/images/icons/arrow-left.svg" alt="back">
    </button>
</template>

<script setup>
    import { computed } from 'vue';

    const showBackButton = computed(() => window.history.state && window.history.state.back !== null);
</script>

<style lang="scss" scoped>
    .close-button {
        @include flex-center;
        width: 2.75rem;
        aspect-ratio: 1;
        background-color: $black;
        border-radius: 50%;
        cursor: pointer;
        img {
            width: 1.5rem;
        }
    }
</style>