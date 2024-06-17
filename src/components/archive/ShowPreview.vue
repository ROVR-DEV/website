<template>
    <div class="archive-preview">
        <img :src="show.publisher_metadata.image" alt="cover" class="archive-preview__image">
        
        <div class="archive-preview__info">
            <div class="archive-preview__top">
                <span v-text="formatDate(show.release_date)" class="archive-preview__date"/>
                <span v-if="+show.publisher_metadata.publisher === playerStore.now_playing_archive" class="archive-preview__nowplaying">now playing</span>
            </div>
            <h2 v-text="show.publisher_metadata.release_title" class="archive-preview__title"/>
            <h3 class="archive-preview__author">
                BY
                <em
                    v-text="show.publisher_metadata.artist"
                    @click="$router.push(`/curator/${slugify(show.publisher_metadata.artist)}`)"/>
            </h3>
        </div>

        <div class="archive-preview__row">
            <div class="archive-preview__buttons">
                <button
                    class="archive-preview__button archive-preview__button--visit"
                    @click="$router.push(`/show/${show.publisher_metadata.publisher}`)">
                        <img src="@/assets/images/icons/arrow-right.svg" alt="arrow">
                </button>
                <button class="archive-preview__button share-button" @click="emit('share', show)">
                    <img src="@/assets/images/icons/share.svg" alt="share">
                </button>
            </div>

            <p class="archive-preview__description" v-text="show.publisher_metadata.description"/>
        </div>
    </div>
</template>

<script setup>
    import { slugify }    from '@/utils/slugify';
    import { formatDate } from '@/utils/formatDate';
    import { usePlayerStore } from '@/stores/player';

    const playerStore = usePlayerStore();

    const emit = defineEmits(['share']);

    defineProps({
        show: {
            type: Object,
            required: true
        }
    });
</script>

<style lang="scss" scoped>
    .archive-preview {
        @include flex(column, flex-start, space-between);
        position: relative;
        color: $primary;
        padding: 1.75rem;
        width: 100%;
        min-height: 285px;
        max-height: 285px;
        height: 100%;
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            background-color: rgba($color: $black, $alpha: 0.5);
        }
        &__image {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            object-fit: cover;
            object-position: right top;
        }
        & > *:not(img) {
            position: relative;
            z-index: 3;
        }
        &__info {
            width: 100%;
            margin-bottom: 1.5rem;
        }
        &__date {
            @include font-size(14px);
            display: block;
            font-weight: normal;
        }
        &__nowplaying {
            @include font-size(12px);
            display: block;
            text-transform: uppercase;
            color: $primary;
        }
        &__title {
            @include font-size(36px);
            font-weight: bold;
            text-transform: uppercase;
            margin: 0 0 0.5rem 0;
        }
        &__author {
            @include flex(row, flex-end, flex-start);
            @include font-size(17px);
            margin: 0;
            line-height: 1;
            em {
                @include font-size(28px);
                letter-spacing: 2%;
                margin-left: 0.75rem;
                line-height: 1;
                cursor: pointer;
            }
        }
        &__row {
            @include flex-center-vert;
        }
        &__top {
            @include flex-center-sb;
            margin-bottom: 1rem;
        }
        &__buttons {
            @include flex-center;
        }
        &__button {
            @include flex-center;
            width: 3rem;
            aspect-ratio: 1;
            border-radius: 50%;
            border: 1px solid $primary;
            cursor: pointer;
            transition: all 0.2s ease-in;
            &--visit {
                background-color: $primary;
                margin-right: 1rem;
                position: relative;
                overflow: hidden;
                img {
                    display: block;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 1.75rem;
                    height: 1.25rem;
                }
                &:hover img {
                    animation: move-arrow 0.5s ease-in-out;
                }
            }
        }
        &__description {
            @include font-size(14px);
            font-weight: normal;
            margin: 0 0 0 1.5rem;
        }
    }

    
    @keyframes move-arrow {
        0% {
            transform: translate(-50%, -50%);
        }
        50% {
            transform: translate(200%, -50%);
        }
        51% {
            transform: translate(-300%, -50%);
        }
        100% {
            transform: translate(-50%, -50%);
        }
    }

    @media screen and (max-width: 1660px) {
        .archive-preview {
            min-height: 220px;
            max-height: 220px;
            padding: 1.5rem;
            &__title {
                @include font-size(33px);
            }
        }
    }

    @media screen and (max-width: 1200px) {
        .archive-preview {
            min-height: 200px;
            max-height: 200px;
        }
    }

    @media screen and (max-width: 480px) {
        .archive-preview {
            min-height: 230px;
            max-height: 230px;
        }
    }
</style>