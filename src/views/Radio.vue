<template>
    <section class="radio" v-if="radio" v-show="!showCuratorInfo">
        <div class="radio__info">
            <div class="show">
                <h1 class="show__title" v-text="radio.show.title"/>
                <h2 class="show__author">BY <em v-text="radio.curator.name" v-press="{ time: 250, scale: 0.97 }" @click="showCuratorInfoHandler(500)"/></h2>
                <p class="show__description" v-text="radio.show.description ?? radio.show.about"/>
                <div class="show__player">
                    <play-button/>
                    <radio-timer
                        :until="Math.round(radio.show.until)"
                        :since="Math.round(radio.show.since)"/>
                </div>

                <!-- FOR MOBILE -->
                <div class="show__cover" @touchstart="startScaling" @touchend="stopScaling">
                    <img :src="radio.curator.photo" :style="{ transform: photoScaleStyle }" class="" alt="preview">
                </div>
                <!-- FOR MOBILE -->
            </div>
            <current-track :title="radio.title" :artist="radio.artist" :label="radio.label"/>
        </div>
        <!-- FOR DESKTOP -->
        <div class="radio__image" @mousedown="startScaling" @mouseup="stopScaling">
            <img :src="radio.curator.photo" :style="{ transform: photoScaleStyle }" alt="preview">
        </div>
        <!-- FOR DESKTOP -->
    </section>

    <curator-info v-if="showCuratorInfo" :curator="radio.curator" @close="showCuratorInfo = false"/>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useUserStore }   from '@/stores/user';
    import { usePlayerStore } from '@/stores/player';
    import io           from 'socket.io-client';
    import Echo         from 'laravel-echo';
    import axios        from 'axios';
    import PlayButton   from '@/components/PlayButton.vue';
    import RadioTimer   from '@/components/RadioTimer.vue';
    import CurrentTrack from '@/components/CurrentTrack.vue';
    import CuratorInfo  from '@/components/CuratorInfo.vue';

    const userStore = useUserStore();
    const radio  = ref(null);
    const showCuratorInfo = ref(false);

    const playerStore = usePlayerStore();

    onMounted(() => {
        axios.get('https://app.rovr.live/api/all/now/playing', {
            headers: {
                'X-TIMEZONE': userStore.gmt,
                'Authorization': `Bearer ${userStore.token}`,
            }
        }).then(e => {
            radio.value = e.data.live;
            playerStore.setStreamUrl(radio.value.stream_url);
            console.log(radio.value);
        }).catch(() => console.log('axios error'));

        window.io = io;
        window.Echo = new Echo(
            {
                broadcaster: 'socket.io',
                namespace: 'App.Events',
                host: 'https://app.rovr.live/',
                auth: { 'headers': { 'Authorization': `Bearer ${userStore.token}`, } }
            });

        window.Echo.private('playnow.' + userStore.gmt).listen('.playnow', e => {
            radio.value = e.playnow.live;
            console.log(radio.value);
        });
    });

    const showCuratorInfoHandler = (delay) => {
        setTimeout(() => showCuratorInfo.value = true, delay);
    }

    // image scale
    const isScaling = ref(false);
    const photoScaleStyle = ref('scale(1)');

    const startScaling = () => {
        isScaling.value = true;
        setTimeout(() => {
            if (isScaling.value) {
                photoScaleStyle.value = 'scale(0.95)';
            }
        }, 500);
    }

    const stopScaling = () => {
        isScaling.value = false;
        photoScaleStyle.value = 'scale(0.98)';
        setTimeout(() => {
            photoScaleStyle.value = 'scale(1)';
            setTimeout(() => {
                showCuratorInfo.value = true;
            }, 300);
        }, 100);
    }
</script>

<style lang="scss" scoped>
    .radio {
        display: flex;
        &__info {
            @include flex-column;
            flex: 0 1 55%;
            .show {
                @include flex-column;
                flex: auto;
                background-color: $black;
                color: $primary;
                padding: 3.25rem 3.75rem;
                &__cover {
                    display: none;
                }
                &__title {
                    @include font-size(80px);
                    line-height: 102%;
                    letter-spacing: -1.659px;
                    text-transform: uppercase;
                    font-weight: bold;
                    margin: 0;
                }
                &__author {
                    @include font-size(56px);
                    font-weight: bold;
                    margin: 0 0 1rem 0;
                    line-height: 1;
                    em {
                        @include font-size(92px);
                        display: inline-block;
                        margin-left: 0.5rem;
                        cursor: pointer;
                    }
                }
                &__description {
                    @include font-size(24px);
                    margin: 0;
                    font-weight: normal;
                    letter-spacing: 0.23px;
                    line-height: 125%;
                    max-width: 620px;
                    margin: 0 0 2.25rem 0;
                }
                &__player {
                    @include flex-center-vert;
                    margin-top: auto;
                }
            }
        }
        &__image {
            position: relative;
            cursor: pointer;
            overflow: hidden;
            flex: 0 1 45%;
            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top;
                position: relative;
                z-index: 1;
                transition: all 0.2s linear;
            }
            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 80%;
                background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.98) 76.04%);
                z-index: 2;
            }
        }
    }
</style>