<template>
    <section class="radio" v-if="radio" v-show="!showCuratorInfo">
        <div class="radio__info">
            <div class="show">
                <h1 class="show__title" v-text="radio.show.title"/>
                <h2 class="show__author">BY <em v-text="radio.curator.name" v-press="{ time: 250, scale: 0.97 }" @click="showCuratorInfoHandler(500)"/></h2>
                <p class="show__description" v-text="radio.show.description ?? radio.show.about"/>
                <div class="show__player">
                    <play-button
                        @play="play"
                        @stop="player.pause()"
                        :isPlayerReady="isPlayerReady"/>
                    <radio-timer
                        :until="Math.round(radio.show.until)"
                        :since="Math.round(radio.show.since)"
                        @finish="finish"/>
                </div>
            </div>
            <current-track :title="radio.title" :artist="radio.artist" :label="radio.label"/>
        </div>
        <div class="radio__image" @mousedown="startScaling" @mouseup="stopScaling">
            <img :src="radioCover" :style="{ transform: photoScaleStyle }" alt="preview">
        </div>
    </section>

    <curator-info v-if="showCuratorInfo" :curator="radio.curator" @close="showCuratorInfo = false"/>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import io           from 'socket.io-client';
    import Echo         from 'laravel-echo';
    import axios        from 'axios';
    import jingleTrack  from '@/assets/media/jingle.mp3';
    import PlayButton   from '@/components/PlayButton.vue';
    import RadioTimer   from '@/components/RadioTimer.vue';
    import CurrentTrack from '@/components/CurrentTrack.vue';
    import CuratorInfo  from '@/components/CuratorInfo.vue';

    const radio  = ref(null);
    const playerTime = ref(0);
    const isPlayerReady = ref(false);
    const showCuratorInfo = ref(false);

    let player = null;
    let jingle = new Audio(jingleTrack);

    onMounted(() => {
        const GMT = window.Date().match(/GMT[+-]\d{2}/)[0];

        axios.get('https://app.rovr.live/api/all/now/playing', {
            headers: {
                'X-TIMEZONE': GMT,
                'Authorization': 'Bearer 1e10f824-8fb2-4951-9815-d84d7bb141f5',
            }
        }).then(e => {
            radio.value = e.data.live;
            player = new Audio(radio.value.stream_url);
            setInterval(() => playerTime.value++, 1000);
            player.addEventListener('canplaythrough', () => isPlayerReady.value = true);
            console.log(radio.value);
        }).catch(() => console.log('axios error'));

        window.io = io;
        window.Echo = new Echo(
            {
                broadcaster: 'socket.io',
                namespace: 'App.Events',
                host: 'https://app.rovr.live/',
                auth: { 'headers': { 'Authorization': 'Bearer ' + '1e10f824-8fb2-4951-9815-d84d7bb141f5' } }
            });

        window.Echo.private('playnow.' + GMT).listen('.playnow', e => {
            radio.value = e.playnow.live;
            console.log(radio.value);
        });
    });

    const radioCover = computed(() => {
        const replaceCover = {
            localhost: 'app.rovr.live',
            lp: 'app'
        }
        
        return radio.value ? radio.value.curator.photo.replace(/localhost|lp/gi, (matched) => replaceCover[matched]) : "";
    });

    const play = () => {
        player.play();
        player.currentTime = playerTime.value;
    }

    const finish = () => {
        if(!player.paused) {
            startFadeOut();

            setTimeout(() => jingle.play(), 2000);

            jingle.onended = () => {
                jingle.pause();
                player.load(radio.value.stream_url);
                player.play();
                player.volume = 1;
                playerTime.value = 0;
            }
        }
    }

    const fadeOutInterval = ref(null);

    const startFadeOut = () => {
        fadeOutInterval.value = setInterval(() => {
            player.volume -= 0.01;
            if (player.volume <= 0.01) {
                player.pause();
                player.volume = 0;
                clearInterval(fadeOutInterval.value);
            }
        }, 20);
    }

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
        @include grid(2, 0);
        &__info {
            @include flex-column;
            .show {
                @include flex-column;
                flex: auto;
                background-color: $black;
                color: $primary;
                padding: 3.25rem 3.75rem;
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
            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
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