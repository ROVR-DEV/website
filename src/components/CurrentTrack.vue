<template>
    <div class="current-track">
        <p>Track:</p>
        <div class="current-track__info">
            <span v-text="artist" class="current-track__artist"/>
            <span v-text="title" class="current-track__title"/>
            <em v-text="label" class="current-track__label"/>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        artist: {
            type: String,
            required: true,
            default: 'Artist'
        },
        title: {
            type: String,
            required: true,
            default: 'Title'
        },
        label: {
            type: String,
            required: true,
            default: 'Label'
        },
    });
</script>

<style lang="scss" scoped>
    .current-track {
        display: flex;
        background-color: $primary;
        padding: 2rem 3.75rem;
        & > p {
            @include font-size(20px);
            color: rgba($color: $black, $alpha: 0.32);
            font-weight: bold;
            line-height: normal;
            margin: 0 3rem 0 0;
        }
        &__info {
            & > * {
                @include font-size(20px);
                display: block;
                color: $black;
                &:not(:last-child) {
                    margin-bottom: 1rem;
                }
            }
        }
        &__artist {
            font-weight: bold;
        }
        &__label {
            font-family: 'GT Alpina', sans-serif;
            font-style: italic;
        }
    }
</style>