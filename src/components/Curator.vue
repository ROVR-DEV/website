<template>
    <div class="curator">
        <div class="curator__photo">
            <img :src="curator.photo" :alt="curator.name">
        </div>
        <div class="curator__info">
            <p class="curator__name" v-text="curator.name" :title="curator.name"/>
            <span class="curator__country" v-text="curator.country_code"/>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        curator: {
            type: Object,
            required: true
        },
    });
</script>

<style lang="scss" scoped>
    .curator {
        @include flex-center-vert;
        background-color: $black;
        color: $primary;
        border-bottom: 2px solid $primary;
        cursor: pointer;
        transition: $transition;
        overflow: hidden;
        &__photo {
            background-color: $primary;
            min-width: 10.75rem;
            max-width: 10.75rem;
            aspect-ratio: 1;
            margin-right: 1.5rem;
            @media screen and (max-width: 768px) {
                min-width: 7.5rem;
                max-width: 7.5rem;
                margin-right: 1rem;
            }
        }
        &__info {
            width: calc(100% - 10.75rem - 1.5rem);
            @media screen and (max-width: 768px) {
                width: calc(100% - 7.5rem - 1rem);
            }
        }
        &__name {
            @include font-size(48px);
            margin: 0;
            text-transform: uppercase;
            font-weight: bold;
            max-width: 95%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 1.5;
            @media screen and (max-width: 768px) {
                @include font-size(32px);
            }
        }
        &__country {
            @include font-size(22px);
            font-weight: bold;
            display: block;
            text-transform: uppercase;
            @media screen and (max-width: 768px) {
                @include font-size(14px);
            }
        }
        &:hover {
            background-color: $primary;
            color: $black;
        }
    }
</style>