<template>
    <section class="show show--archive" v-if="necessary_data">
        <div class="show__info">
            <div class="show__details">
                <div class="show__row">
                    <h2 class="show__date">streamed on {{ formatDate(necessary_data.release_date) }}</h2>

                    <button class="show-tracklist-button" @click="openTracklist"
                        :class="{ ready: show && publisher_id && show.id === +publisher_id }">
                        <img src="@/assets/images/ui/tracklist_button.svg" alt="tracklist">
                    </button>

                    <button class="show__copy copy-button" :class="{ active: copySuccess }" @click="copyLink">
                        <img v-if="copySuccess" src="@/assets/images/icons/check.svg" alt="check">
                        <img v-else src="@/assets/images/icons/copy.svg" alt="copy">
                    </button>

                    <button class="show__share share-button" @click="isShareOpen = true;">
                        <img src="@/assets/images/icons/share.svg" alt="share">
                    </button>
                </div>

                <h1 class="show__title" v-text="necessary_data.publisher_metadata.release_title" />

                <h3 class="show__author">
                    BY
                    <curator-link :artist="necessary_data.publisher_metadata.artist" />
                </h3>

                <p class="show__description" v-text="necessary_data.publisher_metadata.description" />

                <div class="show__player">
                    <show-player :tracks="show ? show.tracks : []" :show_id="+necessary_data.publisher_metadata.publisher"
                        :sc_secret="show ? show.soundcloud_secret : ''" />
                </div>
            </div>

            <current-track type="archive" :archive_id="+necessary_data.publisher_metadata.publisher" />
        </div>

        <show-image v-show="!isTracklistShown" :path="necessary_data.publisher_metadata.cover"
            :curator="necessary_data.publisher_metadata.artist" />

        <transition name="slide-down">
            <tracklist
                v-if="show && isTracklistShown"
                :tracks="show.tracks"
                :title="necessary_data.publisher_metadata.release_title" :date="necessary_data.release_date"
                :author="necessary_data.publisher_metadata.artist" @share="shareArchive(necessary_data)"
                :class="{ active: isTracklistVisible }"
                @close="isTracklistShown = false; isTracklistVisible = false;" />
        </transition>

        <close-button v-if="!isTracklistShown" disabled @click="$router.push({ name: 'archive' })" class="show__close" />

        <span
            v-if="playerStore.isPlaying && playerStore.now_playing_archive === +necessary_data.publisher_metadata.publisher"
            class="show__nowplaying">now playing</span>
    </section>

    <share-popup v-if="isShareOpen" :metadata="sharingMetadata" :id="necessary_data.publisher_metadata.publisher"
        @close="isShareOpen = false" />
</template>

<script setup>
    import { ref, onMounted, watch, nextTick, onUnmounted } from "vue";
    import { useArchiveStore } from "@/stores/archive";
    import { usePlayerStore } from "@/stores/player";
    import { useRouter, useRoute } from "vue-router";
    import { formatDate } from "@/utils/formatDate";
    import { isIOSDevice } from '@/utils/isIOSDevice';
    import { isMobile } from '@/utils/isMobile';
    import { setComputedSizes } from "@/helpers/setComputedSizes";
    import axios from "axios";
    import ShowPlayer from "@/components/archive/ShowPlayer.vue";
    import CurrentTrack from '@/components/CurrentTrack.vue';
    import CloseButton from '@/components/ui/CloseButton.vue';
    import ShowImage from '@/components/ShowImage.vue';
    import CuratorLink from "@/components/curators/CuratorLink.vue";
    import Tracklist from "@/components/archive/Tracklist.vue";
    import SharePopup from '@/components/popups/SharePopup.vue';

    const router = useRouter();
    const route = useRoute();
    const archiveStore = useArchiveStore();
    const playerStore = usePlayerStore();
    const show = ref(null);
    const necessary_data = ref(null);
    const isTracklistShown = ref(false);
    const isTracklistVisible = ref(false);
    const isShareOpen = ref(false);
    const sharingMetadata = ref(null);
    const is_next_archive_ready = ref(false);
    const copySuccess = ref(false);

    const props = defineProps({
        publisher_id: {
            type: String,
            required: true
        }
    });

    onMounted(() => {
        getShow();

        if (archiveStore.archive) {
            necessary_data.value = archiveStore.archive.find(show => props.publisher_id === show.publisher_metadata.publisher);
            loadSharingMetadata(necessary_data.value);
        }
    });

    onUnmounted(() => {
        window.removeEventListener('message', handleMessage);
    });


    watch(() => props.publisher_id, (newId, oldId) => {
        if (archiveStore.archive) necessary_data.value = archiveStore.archive.find(show => props.publisher_id === show.publisher_metadata.publisher);
        if (newId !== oldId) {
            getShow();
            loadSharingMetadata(necessary_data.value);
            isTracklistShown.value = false;
        }
    });

    watch(() => archiveStore.archive, (archive) => {
        if (archive) {
            necessary_data.value = archiveStore.archive.find(show => props.publisher_id === show.publisher_metadata.publisher);
            loadSharingMetadata(necessary_data.value);

            if (route.query.sharing && isMobile()) {
                window.location.href = `rovr://go.rovr.live/showarchive.html?release_date=${necessary_data.value.release_date}&title=${necessary_data.value.publisher_metadata.release_title}&curator=${necessary_data.value.publisher_metadata.artist}&description=${necessary_data.value.publisher_metadata.description}&image=${necessary_data.value.publisher_metadata.cover}&publisher=${necessary_data.value.publisher_metadata.publisher}`;
            }
        }
    });

    watch(() => playerStore.isPlaying, (isPlaying) => {
        if (isPlaying && playerStore.source === 'archive') {
            playerStore.setNowPlayingArchive(show.value.id);
        }
    });

    watch(() => playerStore.source, (source) => {
        if (source !== 'archive') {
            playerStore.setNowPlayingArchive(null);
        } else {
            playerStore.setNowPlayingArchive(show.value.id);
        }
    });

    watch(() => playerStore.is_archive_finished, (is_finished) => {
        if (is_finished) {
            switchToNextOrPreviousShow();
        }
    });

    watch(is_next_archive_ready, (status) => {
        if (status) {
            if( isIOSDevice() ) {
                window.parent.postMessage({ action: 'show_tap_button_ios' }, '*');
            } else {
                playerStore.play('archive');
            }

            is_next_archive_ready.value = false;
            playerStore.setFinished('archive', false);
            
            window.removeEventListener('message', handleMessage);
        }
    });

    watch(show, (newShow) => {
        if (newShow) {
            if (playerStore.source !== 'archive' && playerStore.now_playing_archive !== show.value.id) {
                playerStore.setSoundcloudSecret(show.value.soundcloud_secret);
            }
        }
    });

    watch(() => isTracklistShown.value, (status) => {
        if (status) {
            nextTick(() => {
                let activeTrack = document.querySelector('.archive__track.active');

                if (activeTrack) {
                    const trackRect = activeTrack.getBoundingClientRect();
                    const parentElement = activeTrack.parentNode;
                    const parentRect = parentElement.getBoundingClientRect();

                    const offset = trackRect.top - parentRect.top + parentElement.scrollTop;
                    parentElement.scrollTop = offset - 10;
                }
            });
        }
    });

    const getShow = async () => {
        await axios.get(`https://app.rovr.live/site/playlist/${props.publisher_id}`)
            .then(response => {
                show.value = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }

    const switchToNextOrPreviousShow = async () => {
        const currentShow = necessary_data.value;
        if (!currentShow) return;

        const currentReleaseTitle = currentShow.publisher_metadata.release_title;
        const currentReleaseDate = new Date(currentShow.release_date);

        const showsWithSameTitle = archiveStore.archive.filter(show =>
            show.publisher_metadata.release_title === currentReleaseTitle
        );

        showsWithSameTitle.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

        const currentIndex = showsWithSameTitle.findIndex(show =>
            new Date(show.release_date).getTime() === currentReleaseDate.getTime()
        );

        if (currentIndex === -1) return;

        const nextShow = showsWithSameTitle[currentIndex + 1];

        if (nextShow) {
            await router.push(`/show/${nextShow.publisher_metadata.publisher}`);
        } else {
            await router.push(`/show/${showsWithSameTitle[0].publisher_metadata.publisher}`);
        }

        setTimeout(() => {
            playerStore.setSoundcloudSecret(show.value.soundcloud_secret);
            window.addEventListener('message', handleMessage);
        }, 2500);
    }

    const copyLink = () => {
        const link = `https://share.rovr.live/showarchive.html?release_date=${necessary_data.value.release_date}&title=${necessary_data.value.publisher_metadata.release_title}&curator=${necessary_data.value.publisher_metadata.artist}&description=${necessary_data.value.publisher_metadata.description}&image=${necessary_data.value.publisher_metadata.cover}&publisher=${necessary_data.value.publisher_metadata.publisher}`;
        createShortLink(link);
    }

    const createShortLink = async (link) => {
        const params = {
            url: link
        };

        await axios.post('https://go.rovr.live/shortlink', params)
            .then(response => {
                if (response.data && response.data.short_url) {
                    navigator.clipboard.writeText(response.data.short_url)
                        .then(() => {
                            copySuccess.value = true;
                            setTimeout(() => {
                                copySuccess.value = false;
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('Failed to copy: ', err);
                        });
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const loadSharingMetadata = (data) => {
        sharingMetadata.value = {
            cover: data.publisher_metadata.cover,
            source: 'archive',
            title: data.publisher_metadata.release_title,
            artist: data.publisher_metadata.artist,
            description: data.publisher_metadata.description,
            date: data.release_date,
            publisher: data.publisher_metadata.publisher
        }
    }

    const handleMessage = (event) => {
        const { action } = event.data;

        switch (action) {
            case 'is_ready':
                is_next_archive_ready.value = true;
                break;
        }
    }

    const shareArchive = async (data) => {
        const show_data = data;
        if (isMobile() && navigator.share) {
            let share_url;
            const sharingLink = `https://share.rovr.live/showarchive.html?release_date=${encodeURIComponent(show_data.release_date)}&title=${encodeURIComponent(show_data.publisher_metadata.release_title)}&curator=${encodeURIComponent(show_data.publisher_metadata.artist)}&description=${encodeURIComponent(show_data.publisher_metadata.description)}&image=${encodeURIComponent(show_data.publisher_metadata.cover)}&publisher=${encodeURIComponent(show_data.publisher_metadata.publisher)}`;
            const params = {
                url: sharingLink
            };

            await axios.post('https://go.rovr.live/shortlink', params)
                .then(response => {
                    if (response.data && response.data.short_url) {
                        share_url = response.data.short_url;
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

            const data = {
                title: 'Radio Reinvented',
                url: share_url,
            }

            window.navigator.share(data);
        } else {
            isShareOpen.value = true;

            sharingMetadata.value = {
                cover: show_data.publisher_metadata.cover,
                source: 'archive',
                title: show_data.publisher_metadata.release_title,
                artist: show_data.publisher_metadata.artist,
                description: show_data.publisher_metadata.description,
                date: show_data.release_date,
                publisher: show_data.publisher_metadata.publisher
            }
        }
    }

    const openTracklist = () => {
        isTracklistShown.value = !isTracklistShown.value;

        setTimeout(() => {
            isTracklistVisible.value = true;
        }, 20);

        setTimeout(() => {
            if (isMobile()) {
                setComputedSizes();
            }
        }, 10);
    }
</script>

<style lang="scss" scoped>
    .show {
        border-top: 2px solid $primary;
        position: relative;
        &__info {
            border-right: 2px solid $primary;
        }

        &__close {
            position: absolute;
            top: 3rem;
            right: 40%;
            z-index: 3;
        }

        &__nowplaying {
            @include font-size(14px);
            position: absolute;
            top: 4.75em;
            right: 3rem;
            z-index: 3;
            color: $primary;
            text-transform: uppercase;
            text-shadow: 0 0 4px $black;
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
            pointer-events: none;

            &.ready {
                pointer-events: auto;
            }

            img {
                display: block;
                width: 8rem;
                height: auto;
            }
        }

        &__copy {
            margin-left: auto;

            &.active {
                background-color: $primary;

                img {
                    filter: brightness(0);
                }
            }
        }

        &__share {
            margin-left: 0.75rem;
        }

        &__player {
            @include flex-center-vert;

            button {
                pointer-events: none;
            }
        }
    }

    @media screen and (min-width: 1024px) {
        .slide-down-enter-active, .slide-down-leave-active {
            transition: all 0.3s linear;
        }

        .slide-down-enter-from, .slide-down-leave-to {
            transform: translateY(-100%);
        }

        .slide-down-enter-to, .slide-down-leave-from {
            transform: translateY(0);
        }
    }
</style>