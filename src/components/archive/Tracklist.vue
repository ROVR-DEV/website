<template>
    <div class="archive__tracklist">
        <button class="archive__tracklist-close" @click="emit('close')">
            <img src="@/assets/images/icons/close-small-thin.svg" alt="close">
        </button>

        <div class="archive__tracklist-mobile">
            <div class="archive__tracklist-mobile-info">
                <span v-text="formatDate(date)"/>
                <h3 v-text="title"/>
                <h4>BY <em v-text="author"/></h4>
            </div>
            <div class="archive__tracklist-mobile-controls">
                <button class="archive__tracklist-mobile-close" @click="emit('close')">
                    <img src="@/assets/images/icons/close-small-thin.svg" alt="close">
                </button>
                <button class="archive__tracklist-mobile-share" @click="emit('share')">
                    <img src="@/assets/images/icons/share.svg" alt="share">
                </button>
            </div>
        </div>

        <div class="archive__tracks" ref="tracksContainer">
            <div
                class="archive__track"
                :id="`archive__track-${track.id}`"
                v-for="track in tracks"
                :key="track.id"
                :class="{ active: track.id === activeTrackId || track.title === playerStore.track.title }"
                @click="playTrack(track)">
                    <div class="archive__track-number" v-text="trackNumber(track.pivot.order)"/>
                
                    <div class="archive__track-info">
                        <h5 class="archive__track-title" v-text="track.title"/>
                        <h6 class="archive__track-author">by <em v-text="track.artist"/></h6>
                        <span class="archive__track-label" v-if="track.label" v-text="track.label"/>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, nextTick, watch } from "vue";
    import { formatDate } from '@/utils/formatDate';
    import { usePlayerStore } from "@/stores/player";

    const playerStore = usePlayerStore();
    const activeTrackId = ref(null);
    const tracksContainer = ref(null);

    const props = defineProps({
        tracks: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true
        }
    });

    const emit = defineEmits(['close', 'share']);

    const setActiveTrack = async (id) => {
        activeTrackId.value = id;
        await nextTick();
        scrollToActiveTrack();
    }

    const playTrack = (track) => {
        const startTime = track.start * 1000;
        window.parent.postMessage({ action: 'seekTo', value: startTime }, '*');
        playerStore.play('archive');
        playerStore.updateTrack(track.title, track.artist, track.label, track.cover);
        setActiveTrack(track.id);
    }

    const scrollToActiveTrack = () => {
        const trackElement = document.querySelector(`#archive__track-${activeTrackId.value}`);
        const parentElement = tracksContainer.value;

        if (trackElement && parentElement) {
            const trackRect = trackElement.getBoundingClientRect();
            const parentRect = parentElement.getBoundingClientRect();

            const offset = trackRect.top - parentRect.top + parentElement.scrollTop;
            parentElement.scrollTo({ top: offset - 10, behavior: 'smooth' });
        }
    }

    const trackNumber = (order) => {
        return order < 9 ? `0${order + 1}` : (order + 1);
    }

    watch(() => playerStore.track.title, () => {
        const currentTrack = props.tracks.find(track => track.title === playerStore.track.title);

        if (currentTrack) {
            setActiveTrack(currentTrack.id);
        }
    });
</script>

<style lang="scss" scoped>
    .archive__tracklist {
        flex: 0 1 45%;
        position: relative;
        z-index: 4;
        &-close {
            @include flex-center;
            position: relative;
            top: 3rem;
            right: 2rem;
            margin-left: auto;
            width: 3rem;
            aspect-ratio: 1;
            border-radius: 50%;
            border: 1.5px solid $primary;
            background-color: black;
            cursor: pointer;
            transition: all 0.2s ease-in;
            z-index: 3;
            img {
                display: block;
                width: 1.125rem;
                transition: all 0.2s ease-in;
            }
            &:hover {
                background-color: $primary;
                img {
                    filter: brightness(0);
                }
            }
        }
        &-mobile {
            display: none;
        }
    }
    .archive__tracks {
        padding: 3rem;
        background-color: $black;
        position: relative;
        height: 100%;
        overflow-y: auto;
    }
    .archive__track {
        @include flex-center-vert;
        color: $primary;
        cursor: pointer;
        position: relative;
        top: -3rem;
        z-index: 1;
        &-number {
            @include flex-center;
            @include font-size(23px);
            font-weight: normal;
            line-height: normal;
            width: 3.75rem;
            min-width: 3.75rem;
            aspect-ratio: 1;
            border-radius: 50%;
            border: 2.5px solid $primary;
            margin-right: 2.25rem;
        }
        &-title {
            @include font-size(23px);
            font-weight: bold;
            margin: 0 0 0.325rem 0;
            line-height: 1;
        }
        &-author {
            @include font-size(20px);
            margin: 0;
            line-height: 1;
            em {
                @include font-size(26px);
                line-height: 1;
            }
        }
        &-label {
            @include font-size(18px);
            display: block;
            font-weight: normal;
            line-height: 1;
            margin-top: 0.6rem;
        }
        &:not(:last-child) {
            margin-bottom: 1.25rem;
        }
        &.active {
            .archive__track-number {
                background-color: $primary;
                color: $black;
                font-weight: bold;
            }
        }
    }

    @media screen and (max-width: 1660px) {
        .archive__tracklist {
            &-close {
                top: 1.5rem;
            }
            .archive__tracks {
                padding: 3rem 2.5rem;
                top: -20px;
            }
            
        }
    }

    @media screen and (max-width: 1024px) {
        .archive__tracklist {
            flex: 0 1 100%;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 4;
            border-left: none;
            display: flex;
            flex-direction: column;
            &-close {
                display: none;
            }
            &-mobile {
                @include flex(row, center, space-between);
                background-color: $primary;
                padding: 1.5rem 2.5rem;
                &-info {
                    color: $black;
                    span {
                        font-size: 1rem;
                        display: block;
                        line-height: 1;
                        font-weight: normal;
                        margin: 0 0 0.75rem 0;
                    }
                    h3 {
                        font-weight: bold;
                        margin: 0 0 0.4rem 0;
                        font-size: 1.625rem;
                        line-height: 1;
                    }
                    h4 {
                        font-size: 1rem;
                        font-weight: bold;
                        margin: 0;
                        em {
                            font-size: 1.75rem;
                            margin-left: 0.325rem;
                            margin: 0;
                        }
                    }
                }
                &-controls {
                    button {
                        @include flex-center;
                        width: 3rem;
                        min-width: 3rem;
                        aspect-ratio: 1;
                        border-radius: 50%;
                        border: 1.5px solid $black;
                        cursor: pointer;
                        outline: none;
                        img {
                            display: block;
                            filter: brightness(0);
                        }
                        &.archive__tracklist-mobile-close {
                            margin-bottom: 1.5rem;
                            img {
                                width: 1.125rem;
                            }
                        }
                        &.archive__tracklist-mobile-share {
                            img {
                                width: 1.25rem;
                                position: relative;
                                left: -1px;
                            }
                        }
                    }
                }
            }
        }
        .archive__tracklist .archive__tracks {
            height: auto;
            flex: auto;
            padding: 2rem;
            top: 0 !important;
        }
        .archive__track {
            top: 0;
            &-number {
                width: 3rem;
                min-width: 3rem;
                font-size: 1.125rem;
                margin-right: 1.75rem;
            }
            &-title {
                font-size: 1.125rem;
            }
            &-author {
                font-size: 1rem;
                em {
                    font-size: 1.325rem;
                }
            }
            &-label {
                font-size: 0.9rem;
            }
        }
    }
</style>