<template>
    <button class="close-button" v-if="!disabled && showBackButton" @click="$router.go(-1);">
        <img src="@/assets/images/icons/arrow-left.svg" alt="back">
    </button>

    <button class="close-button" v-else-if="disabled">
        <img src="@/assets/images/icons/arrow-left.svg" alt="back">
    </button>
</template>

<script setup>
    import { computed } from 'vue';

    defineProps({
        disabled: {
            type: Boolean,
            required: false,
        }
    });

    const showBackButton = computed(() => window.history.state && window.history.state.back !== null);
</script>

<style lang="scss" scoped>
.close-button {
    @include flex-center;
    width: 3rem;
    aspect-ratio: 1;
    background-color: $black;
    border-radius: 50%;
    cursor: pointer;

    img {
        width: 1.5rem;
    }
}
</style>
