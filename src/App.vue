<template>
    <template v-if="!error">
        <div id="base-layout">
            <Header />

            <main class="main">
                <transition name="fade">
                    <download-popup v-if="showDownloadPopup" @close="showDownloadPopup = false"/>
                </transition>

                <router-view v-slot="{ Component }">
                    <player />

                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </main>

            <Footer />
        </div>
    </template>

    <div class="error" v-else>
        <img src="/src/assets/images/error.svg" alt="error">
        <p>An error occurred while loading application resources.</p>
    </div>
</template>

<script setup>
    import { onMounted, onUnmounted, ref, computed, watch } from "vue";
    import io from 'socket.io-client';
    import Echo from 'laravel-echo';
    import axios from 'axios';
    import { useUserStore } from "@/stores/user";
    import { useRadioStore } from "@/stores/radio";
    import { useCuratorsStore } from '@/stores/curators';
    import { useScheduleStore } from '@/stores/schedule';
    import { usePlayerStore } from "./stores/player";
    import Player from "./components/Player.vue";
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import DownloadPopup from "@/components/DownloadPopup.vue";

    const error = ref(false);
    const isDocumentHidden = ref(false);

    const showDownloadPopup = ref(false);

    const radioStore = useRadioStore();
    const userStore = useUserStore();
    const curatorsStore = useCuratorsStore();
    const scheduleStore = useScheduleStore();
    const playerStore = usePlayerStore();

    const currentHour = ref(new Date().getHours());
    const intervalId = ref(null);

    onMounted(async () => {
        intervalId.value = setInterval(checkNewHour, 60000);

        getRadio();
        getCurators();
        getSchedule();

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
            playerStore.updateTrack(radioStore.radio.title, radioStore.radio.artist, radioStore.radio.label, metadataCover);
        });

        document.addEventListener(visibilityChange, handleVisibilityChange, false);

        setTimeout(() => {
            showDownloadPopup.value = true;
        }, 15000);
    });

    onUnmounted(() => {
        clearInterval(intervalId.value);
        document.removeEventListener(visibilityChange);
    });

    watch(() => isDocumentHidden.value, async (state) => {
        if(!state) {
            getRadio();
        }
    });

    const checkNewHour = () => {
        const newHour = new Date().getHours();
        if ((newHour !== currentHour.value) && (isDocumentHidden.value || !isDocumentHidden.value)) {
            currentHour.value = newHour;
            scheduleStore.loadSchedule(null);
            getSchedule();
        }
    }

    const getRadio = async () => {
        await axios.get('https://app.rovr.live/api/all/now/playing', {
            headers: {
                'X-TIMEZONE': userStore.gmt,
                'Authorization': `Bearer ${userStore.token}`,
            }
        }).then(e => {
            radioStore.loadData(e.data.live);
            playerStore.setStreamUrl(radioStore.radio.stream_url);
            playerStore.updateTrack(radioStore.radio.title, radioStore.radio.artist, radioStore.radio.label, metadataCover);
            console.log(radioStore.radio);
        }).catch(() => console.log('axios error'));
    }

    const getSchedule = async () => {
        await axios.get('https://app.rovr.live/api/notifications/reminders/all', {
            headers: {
                'X-TIMEZONE': userStore.gmt,
                'Authorization': `Bearer ${userStore.token}`,
            }
        }).then(e => {
            scheduleStore.loadSchedule(e.data);
            console.log(e.data);
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
            console.log(e.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    // replacing radio cover (backend bug)
    const metadataCover = computed(() => {
        const replaceCover = {
            localhost: 'app.rovr.live',
            lp: 'app'
        }

        return radioStore.radio ? radioStore.radio.show.cover_app_radio.replace(/localhost|lp/gi, (matched) => replaceCover[matched]) : "";
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
        p {
            @include font-size(24px);
        }
    }
</style>