<template>
    <div class="archive-preview">
        <img :src="show.publisher_metadata.image" alt="cover" class="archive-preview__image">

        <div class="archive-preview__info">
            <div class="archive-preview__top">
                <span v-text="formatDate(show.release_date)" class="archive-preview__date" />
                <span v-if="playerStore.isPlaying && +show.publisher_metadata.publisher === playerStore.now_playing_archive"
                    class="archive-preview__nowplaying">now playing</span>
            </div>
            <h2 v-text="show.publisher_metadata.release_title" class="archive-preview__title" />
            <h3 class="archive-preview__author">
                BY
                <curator-link :artist="show.publisher_metadata.artist"/>
            </h3>
        </div>

        <div class="archive-preview__row">
            <div class="archive-preview__buttons">
                <button class="archive-preview__button archive-preview__button--visit" v-press="{ time: 150, scale: 0.96 }"
                    @click="gotoArchive(300)">
                    <img src="@/assets/images/icons/arrow-right.svg" alt="arrow">
                </button>
                <button class="archive-preview__button share-button" @click="emit('share', show)">
                    <img src="@/assets/images/icons/share.svg" alt="share">
                </button>
            </div>

            <p class="archive-preview__description" v-text="show.publisher_metadata.description" />
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { formatDate } from '@/utils/formatDate';
    import { usePlayerStore } from '@/stores/player';
    import CuratorLink from '@/components/CuratorLink.vue';

    const router = useRouter();
    const playerStore = usePlayerStore();
    const emit = defineEmits(['share']);

    const props = defineProps({
        show: {
            type: Object,
            required: true
        }
    });

    //const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const gotoArchive = async (delayTime) => {
        //await delay(delayTime);
        setTimeout(() => {
            router.push(`/show/${props.show.publisher_metadata.publisher}`);
        }, delayTime);
    }


</script>

<style lang="scss" scoped>
    .archive-preview {
        @include flex(column, flex-start, space-between);
        position: relative;
        color: $primary;
        padding: 1.75rem;
        width: 100%;
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
            text-shadow: 0 0 4px $black;
        }
        &__title {
            @include font-size(36px);
            font-weight: bold;
            text-transform: uppercase;
            margin: 0 0 1rem 0;
        }
        &__author {
            @include flex(row, flex-start, flex-start);
            @include font-size(16px);
            margin: 0;
            line-height: 1;
            em {
                @include font-size(28px);
                letter-spacing: 2%;
                margin-left: 0.625rem;
                line-height: 1;
                cursor: pointer;
                margin-top: -8px;
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
            width: 2.75rem;
            height: 2.75rem;
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
                    width: 1.75rem;
                    height: 1.25rem;
                }
            }
        }
        &__description {
            @include font-size(14px);
            font-weight: normal;
            margin: 0 0 0 1.5rem;
        }
    }

    @media screen and (max-width: 1660px) {
        .archive-preview {
            padding: 1.5rem;
            &__title {
                @include font-size(33px);
            }
        }
    }

    @media screen and (max-width: 1440px) {
        .archive-preview {
            &__title {
                @include font-size(28px);
            }
            &__button {
                width: 2.5rem;
                height: 2.5rem;
            }
        }
    }
</style>