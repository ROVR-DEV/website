<template>
    <template v-if="!error">
        <div id="base-layout">
            <Header />
    
            <main class="main">
                <router-view v-slot="{ Component }">
                    <player/>
                    
                    <keep-alive>
                        <component :is="Component"/>
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
    import { onMounted, ref } from "vue";
    import { useUserStore } from "./stores/user";
    import { useCuratorsStore } from '@/stores/curators';
    import { useScheduleStore } from '@/stores/schedule';
    import axios from "axios";
    import Player from "./components/Player.vue";
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";

    const error = ref(false);

    const userStore = useUserStore();
    const curatorsStore = useCuratorsStore();
    const scheduleStore = useScheduleStore();

    onMounted(async () => {
        await axios.get('https://app.rovr.live/api/notifications/curators/all', {
            headers: {
                'Authorization': `Bearer ${userStore.token}`,
            }
        }).then(e => {
            curatorsStore.loadCurators(e.data);
        }).catch((e) => {
            console.log(e);
        });

        await axios.get('https://app.rovr.live/api/notifications/reminders/all', {
            headers: {
                'X-TIMEZONE': userStore.gmt,
                'Authorization': `Bearer ${userStore.token}`,
            }
        }).then(e => {
            scheduleStore.loadSchedule(e.data);
        }).catch((e) => {
            console.log(e);
        });
    });
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