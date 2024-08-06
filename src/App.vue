<template>
    <template v-if="!error">
        <div id="base-layout">
            <Header />

            <main class="main" :class="{ 'main--lock': showDownloadPopup }">
                <transition name="fade">
                    <download-popup v-if="showDownloadPopup"
                        @close="showDownloadPopup = false; curatorsStore.popupShowing(false);" />
                </transition>

                <router-view v-slot="{ Component }">
                    <radio-player />
                    <archive-player />

                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </main>

            <Footer />
        </div>
    </template>

    <div class="error" v-else>
        <img src="/src/assets/images/logo/logo.svg" alt="logo">
        <p>An error occurred while loading application resources, please try again later.</p>
    </div>
</template>

<script setup>
    import { onMounted, onUnmounted, ref, computed, watch, nextTick } from "vue";
    import { useRoute, useRouter } from 'vue-router';
    import io from 'socket.io-client';
    import Echo from 'laravel-echo';
    import axios from 'axios';
    import { useUserStore } from "@/stores/user";
    import { useRadioStore } from "@/stores/radio";
    import { useCuratorsStore } from '@/stores/curators';
    import { useScheduleStore } from '@/stores/schedule';
    import { useArchiveStore } from '@/stores/archive';
    import { usePlayerStore } from "@/stores/player";
    import { slugify } from "@/utils/slugify";
    import { isMobile } from "@/utils/isMobile";
    import { setComputedSizes } from "@/helpers/setComputedSizes";
    import RadioPlayer from "@/components/players/RadioPlayer.vue";
    import ArchivePlayer from "@/components/players/ArchivePlayer.vue";
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import DownloadPopup from "@/components/DownloadPopup.vue";

    const router = useRouter();
    const route = useRoute();

    const error = ref(false);
    const isDocumentHidden = ref(false);

    const showDownloadPopup = ref(false);

    const radioStore = useRadioStore();
    const userStore = useUserStore();
    const curatorsStore = useCuratorsStore();
    const scheduleStore = useScheduleStore();
    const archiveStore = useArchiveStore();
    const playerStore = usePlayerStore();

    const intervalId = ref(null);

    let nextShowImg = new Image();

    onMounted(async () => {
        getRadio();
        getCurators();
        getSchedule();
        getArchive();

        await router.isReady();

        window.io = io;
        window.Echo = new Echo(
            {
                broadcaster: 'socket.io',
                namespace: 'App.Events',
                host: 'https://app.rovr.live/',
                auth: { 'headers': { 'Authorization': `Bearer ${userStore.token}`, } }
            });

        window.Echo.private('playnow.' + userStore.gmt).listen('.playnow', (e) => {
            radioStore.loadData(e.playnow.live);

            if (playerStore.isPlaying && playerStore.source === 'radio') {
                playerStore.updateTrack(radioStore.radio.title, radioStore.radio.artist, radioStore.radio.label, metadataCover);
            }

            error.value = false;
        });

        if ( isMobile() ) {
            await nextTick();
            setComputedSizes();
        }

        document.addEventListener(visibilityChange, handleVisibilityChange, false);

        setTimeout( async () => {
            if (!route.query.webview) {
                curatorsStore.setScrollPosition(document.querySelector('.main').scrollTop);
                showDownloadPopup.value = true;
                curatorsStore.popupShowing(true);
                document.querySelector('.main').scrollTop = 0;
                await nextTick();
                setComputedSizes();
            }
        }, 15000);
    });

    onUnmounted(() => {
        clearInterval(intervalId.value);
        document.removeEventListener(visibilityChange);
    });

    watch(() => radioStore.radio, async (newRadio) => {
        if (newRadio && isMobile()) {
            await nextTick();
            setComputedSizes();
        }
    }, { immediate: true });

    watch(route, async () => {
        if ( isMobile() ) {
            await nextTick();
            setComputedSizes();
        }
    }, { immediate: true });

    watch(() => isDocumentHidden.value, async (state) => {
        if (!state) {
            getRadio();
        }
    });

    // redirecting to archive when user came from sharing link
    watch(() => archiveStore.archive, (newArchive) => {
        if (newArchive && route.query.title && route.query.release_date) {
            const archive_title = route.query.title;
            const archive_date = route.query.release_date;

            const foundArchive = archiveStore.archive.find(archive => archive.publisher_metadata.release_title === archive_title && archive.release_date === archive_date);

            if(foundArchive) {
                router.push(`/show/${foundArchive.publisher_metadata.publisher}`);
            } else {
                router.push('/archive');
            }
        }
    }, { immediate: true });

    // redirecting to curator page when user came from sharing link
    watch(() => curatorsStore.curators, (newCurators) => {
        if (newCurators && route.query.curator_id) {
            const curator_id = route.query.curator_id;

            const foundCurator = curatorsStore.curators.find(curator => curator.id === +curator_id);

            if (foundCurator) {
                router.push(`/curator/${slugify(foundCurator.name)}`);
            } else {
                router.push('/curators');
            }
        }
    }, { immediate: true });

    // updating schedule 
    watch(() => playerStore.is_radio_finished, (state) => {
        if (state) {
            radioStore.loadData(scheduleStore.schedule[1]);
            radioStore.radio.show.since = 0;
            radioStore.radio.show.until = 7200;
        }
    });

    const getRadio = async () => {
        await axios.get('https://app.rovr.live/api/all/now/playing', {
            headers: {
                'X-TIMEZONE': userStore.gmt,
                'Authorization': `Bearer ${userStore.token}`,
            }
        }).then(e => {
            radioStore.loadData(e.data.live);
            playerStore.setStreamUrl(radioStore.radio.stream_url);
            error.value = false;
        }).catch(() => error.value = false);
    }

    const getSchedule = async () => {
        await axios.get('https://app.rovr.live/api/notifications/reminders/all', {
            headers: {
                'X-TIMEZONE': userStore.gmt,
                'Authorization': `Bearer ${userStore.token}`,
            }
        }).then(e => {
            scheduleStore.loadSchedule(e.data);
            nextShowImg.src = scheduleStore.schedule[1].show.cover;
        }).catch((e) => {
            console.log(e);
        });
    }

    const getCurators = async () => {
        await axios.get('https://app.rovr.live/api/notifications/curators/all', {
            headers: {
                'Authorization': `Bearer ${userStore.token}`,
            }
        }).then(e => {
            curatorsStore.loadCurators(e.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    const getArchive = async () => {
        try {
            const response = await axios.get('https://arh.rovr.live/get-sounds-from-db?requestAuthToken=kBPA828rg6ppypFKjkadjkajkdHJhkd739817hHJhjkbdsjkbbHHdak31');
            const archiveSortedByDate = response.data.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            archiveStore.loadArchive(archiveSortedByDate);
        } catch (e) {
            console.log(e);
        }
    }

    // replacing radio cover (backend bug)
    const metadataCover = computed(() => {
        const replaceCover = {
            localhost: 'app.rovr.live',
            lp: 'app'
        }

        if (radioStore.radio) {
            if (radioStore.radio.show.cover_app_radio) {
                return radioStore.radio.show.cover_app_radio.replace(/localhost|lp/gi, (matched) => replaceCover[matched]);
            }
        }

        return radioStore.radio.show.cover_mobile ?? radioStore.radio.show.cover;
    });

    let hidden, visibilityChange;

    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    } else {
        console.log('Page Visibility API not supported.');
    }

    const handleVisibilityChange = () => {
        isDocumentHidden.value = document[hidden];
    }
</script>

<style lang="scss" scoped>
    #base-layout {
        @include flex-column;
        justify-content: space-between;
        height: 100%;
    }

    .error {
        @include flex-center-column;
        height: 100%;

        img {
            width: 20rem;

            @media screen and (max-width: 1024px) {
                width: 17rem;
            }
        }

        p {
            @include font-size(20px);
            color: $primary;
            margin: 2rem 0;
            max-width: 500px;
            text-align: center;
            padding: 0 1rem;

            @media screen and (max-width: 1660px) {
                max-width: 450px;
            }

            @media screen and (max-width: 1400px) {
                max-width: 400px;
            }
        }
    }
</style>