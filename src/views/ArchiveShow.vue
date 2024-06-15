<template>
    <section class="show show--archive" v-if="necessary_data">
        <div class="show__info">
            <div class="show__details">
                <div class="show__row">
                    <h2 class="show__date">streamed on {{ formatDate(necessary_data.release_date) }}</h2>

                    <button class="show-tracklist-button" @click="isTracklistShown = !isTracklistShown">
                        <img src="@/assets/images/ui/tracklist_button.svg" alt="tracklist">
                    </button>
                    
                    <button class="show__share share-button">
                        <img src="@/assets/images/icons/share.svg" alt="share">
                    </button>
                </div>

                <h1 class="show__title" v-text="necessary_data.publisher_metadata.release_title" />

                <h3 class="show__author">
                    BY
                    <em v-text="necessary_data.publisher_metadata.artist"
                        @click="$router.push(`/curator/${slugify(necessary_data.publisher_metadata.artist)}`)"/>
                </h3>

                <p class="show__description" v-text="necessary_data.publisher_metadata.description" />

                <div class="show__player">
                    <show-player v-if="show" :tracks="show.tracks"/>
                </div>
            </div>

            <current-track type="archive"/>
        </div>

        <show-image
            v-if="!isTracklistShown"
            :path="necessary_data.publisher_metadata.cover"
            :curator="necessary_data.publisher_metadata.artist"/>

        <tracklist
            v-if="show && isTracklistShown"
            :tracks="show.tracks"
            :title="necessary_data.publisher_metadata.release_title"
            :date="necessary_data.release_date"
            :author="necessary_data.publisher_metadata.artist"
            @close="isTracklistShown = false"/>

        <close-button v-if="!isTracklistShown" class="show__close"/>
    </section>
</template>

<script setup>
    import { ref, onMounted, watch } from "vue";
    import { useArchiveStore } from "@/stores/archive";
    import { usePlayerStore } from "@/stores/player";
    import { slugify } from '@/utils/slugify';
    import { formatDate } from "@/utils/formatDate";
    import axios from "axios";
    import ShowPlayer from "@/components/archive/ShowPlayer.vue";
    import CurrentTrack from '@/components/CurrentTrack.vue';
    import CloseButton from '@/components/ui/CloseButton.vue';
    import ShowImage from '@/components/ShowImage.vue';
    import Tracklist from "@/components/archive/Tracklist.vue";

    const archiveStore = useArchiveStore();
    const playerStore = usePlayerStore();
    const show = ref(null);
    const necessary_data = ref(null);
    const isTracklistShown = ref(false);

    const props = defineProps({
        publisher_id: {
            type: String,
            required: true
        }
    });

    onMounted(() => {
        getShow();
        if(archiveStore.archive) necessary_data.value = archiveStore.archive.find(show => props.publisher_id === show.publisher_metadata.publisher);
    });

    watch(() => props.publisher_id, (newId, oldId) => {
        if(archiveStore.archive) necessary_data.value = archiveStore.archive.find(show => props.publisher_id === show.publisher_metadata.publisher);
        if(newId !== oldId) {
            getShow();
            isTracklistShown.value = false;
        }
    });

    watch(() => archiveStore.archive, (archive) => {
        if(archive) necessary_data.value = archiveStore.archive.find(show => props.publisher_id === show.publisher_metadata.publisher);
    });

    const getShow = async () => {
        await axios.get(`https://corsproxy.io/?https://app.rovr.live/site/playlist/${props.publisher_id}`)
            .then(response => {
                show.value = response.data;
                playerStore.setSoundcloudSecret(show.value.soundcloud_secret);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
</script>

<style lang="scss" scoped>
    .show {
        border-top: 2px solid $primary;
        flex-direction: row-reverse;
        &__close {
            position: absolute;
            top: 3rem;
            left: 3rem;
            z-index: 3;
        }
        &__row {
            @include flex-center-vert;
            margin-bottom: 1rem;
        }
        &__date {
            @include font-size(32px);
            color: $primary;
            font-weight: bold;
            text-transform: uppercase;
            line-height: 1;
            margin: 0;
        }
        &-tracklist-button {
            margin-left: 2rem;
            cursor: pointer;
            position: relative;
            top: -2px;
            outline: none;
            img {
                display: block;
                width: 8rem;
                height: auto;
            }
        }
        &__share {
            margin-left: auto;
        }
        &__player {
            @include flex-center-vert;
            button {
                pointer-events: none;
            }
        }
    }
</style>