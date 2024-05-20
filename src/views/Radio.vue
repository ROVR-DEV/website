<template>
    <section class="radio" v-if="radioStore.radio" v-show="!showCuratorInfo">
        <div class="radio__info">
            <div class="show">
                <h1 class="show__title" v-text="radioStore.radio.show.title"/>
                <h2 class="show__author">BY <em v-text="radioStore.radio.curator.name" v-press="{ time: 250, scale: 0.97 }" @click="showCuratorInfoHandler(500)"/></h2>
                <p class="show__description" v-text="radioStore.radio.show.description ?? radioStore.radio.show.about"/>
                <div class="show__player">
                    <play-button/>
                    <radio-timer/>
                </div>
            </div>
            
            <current-track/>
        </div>

        <div class="radio__image"
            @mousedown.prevent="isMobile ? null : startScaling()" 
            @mouseup.prevent="isMobile ? null : stopScaling()"
            @touchstart.prevent="isMobile ? startScaling() : null" 
            @touchend.prevent="isMobile ? stopScaling() : null">
            <img 
                v-if="radioStore.radio"
                :src="radioCover"
                :style="{ transform: photoScaleStyle }" 
                oncontextmenu="return false;"
                alt="preview"
                fetchpriority="high">
        </div>
    </section>

    <curator-info v-if="showCuratorInfo" :curator="radioStore.radio.curator" @close="showCuratorInfo = false"/>
</template>

<script setup>
    import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
    import { useRadioStore } from "@/stores/radio";
    import { useRoute } from 'vue-router';
    import PlayButton   from '@/components/PlayButton.vue';
    import RadioTimer   from '@/components/RadioTimer.vue';
    import CurrentTrack from '@/components/CurrentTrack.vue';
    import CuratorInfo  from '@/components/CuratorInfo.vue';

    const route = useRoute();

    const radioStore = useRadioStore();
    const showCuratorInfo = ref(false);

    const isMobile = ref(false);

    const checkIfMobile = () => {
        isMobile.value = window.innerWidth <= 1024;
    }

    onMounted(() => {
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        watch(() => radioStore.radio, (state) => {
            if(state) {
                let preloadLink = document.createElement("link");
                preloadLink.href = radioStore.radio.show.cover;
                preloadLink.rel = "preload";
                preloadLink.as = "image";
                document.head.appendChild(preloadLink);
            }
        }, { once: true });
    });

    onUnmounted(() => {
        onUnmounted(() => {
            window.removeEventListener('resize', checkIfMobile);
        });
    });

    const showCuratorInfoHandler = (delay) => {
        setTimeout(() => showCuratorInfo.value = true, delay);
    }

    // replacing radio cover (backend bug)
    const radioCover = computed(() => {
        const replaceCover = {
            localhost: 'app.rovr.live',
            lp: 'app'
        }

        return radioStore.radio ? radioStore.radio.show.cover.replace(/localhost|lp/gi, (matched) => replaceCover[matched]) : "";
    });

    watch(route, () => showCuratorInfo.value = false);

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
        overflow: hidden;
        &__info {
            @include flex-column;
            flex: 0 1 55%;
            .show {
                @include flex-column;
                flex: auto;
                background-color: $black;
                color: $primary;
                padding: 3rem 3.5rem;
                &__cover {
                    display: none;
                }
                &__title {
                    @include font-size(72px);
                    line-height: 102%;
                    letter-spacing: -1.659px;
                    text-transform: uppercase;
                    font-weight: bold;
                    margin: 0;
                }
                &__author {
                    @include font-size(48px);
                    font-weight: bold;
                    margin: 0 0 1rem 0;
                    line-height: 1;
                    em {
                        @include font-size(80px);
                        display: inline-block;
                        margin-left: 0.5rem;
                        cursor: pointer;
                    }
                }
                &__description {
                    @include font-size(22px);
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