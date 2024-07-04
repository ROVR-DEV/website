<template>
    <teleport to="#modal">
        <div class="share-popup popup" v-if="metadata">
            <div class="share-popup__content" ref="target">
                <div class="share-popup__header">
                    <div class="share-popup__logo">
                        <img src="@/assets/images/logo/logo.svg" alt="logo">
                    </div>
                    <div class="share-popup__close" @click="emit('close')">
                        <img src="@/assets/images/icons/close-small.svg" alt="close">
                    </div>
                </div>

                <div class="share-popup__preview">
                    <div class="share-popup__cover">
                        <img :src="metadata.cover" alt="cover">
                    </div>
                    <div class="share-popup__details">
                        <span class="share-popup__source">{{ metadata.source }} - {{ formatDate(metadata.date) }}</span>
                        <h3 v-text="metadata.title" class="share-popup__title"/>
                        <h4 class="share-popup__artist">BY <em v-text="metadata.artist"/></h4>
                    </div>
                </div>

                <p class="share-popup__tip">Share on:</p>

                <div class="share-popup__links">
                    <s-twitter :share-options="twitterShareOptions">
                        <img src="@/assets/images/icons/social-media/x.svg">
                    </s-twitter>

                    <s-telegram :share-options="telegramShareOptions">
                        <img src="@/assets/images/icons/social-media/telegram.svg">
                    </s-telegram>

                    <s-whats-app :share-options="whatsappShareOptions">
                        <img src="@/assets/images/icons/social-media/whatsapp.svg">
                    </s-whats-app>

                    <s-facebook :share-options="facebookShareOptions">
                        <img src="@/assets/images/icons/social-media/facebook.svg">
                    </s-facebook>
                </div>

                <p class="share-popup__tip">Copy the link:</p>

                <div class="share-popup__copy">
                    <div class="share-popup__link">
                        <span v-if="url" v-text="url" :class="{ hide: copySuccess }" readonly @click="copy"/>
                        
                        <transition name="fade">
                            <p v-if="copySuccess" class="share-popup__success">Link copied to clipboard!</p>
                        </transition>
                    </div>

                    <button @click="copy" class="copy-button">
                        <img src="@/assets/images/icons/copy.svg" alt="copy">
                    </button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { SFacebook, STelegram, STwitter, SWhatsApp } from 'vue-socials';
    import { onClickOutside } from '@vueuse/core';
    import { formatDate } from '@/utils/formatDate';
    import axios from 'axios';

    const url = ref(null);
    const shareLink = ref('');
    const copySuccess = ref(false);
    const target = ref(null);

    const emit = defineEmits(['close']);

    onClickOutside(target, () => emit('close'));

    const props = defineProps({
        metadata: {
            type: Object,
            required: true,
        },
        id: {
            type: String,
            required: true,
        }
    });

    onMounted(() => {
        if (props.id) {
            shareLink.value = `https://share.rovr.live/showarchive.html?release_date=${encodeURIComponent(props.metadata.date)}&title=${encodeURIComponent(props.metadata.title)}&curator=${encodeURIComponent(props.metadata.artist)}&description=${encodeURIComponent(props.metadata.description)}&image=${encodeURIComponent(props.metadata.cover)}&publisher=${encodeURIComponent(props.metadata.publisher)}`;
            createShortLink(shareLink.value);
        }
    });

    const facebookShareOptions = computed(() => ({
        url: url.value,
        quote: `ROVR Archive: ${props.metadata.title} by ${props.metadata.artist}`,
        hashtag: '#Radio',
    }));

    const telegramShareOptions = computed(() => ({
        url: url.value,
    }));

    const twitterShareOptions = computed(() => ({
        url: url.value,
        hashtags: ['Radio', 'Music'],
    }));

    const whatsappShareOptions = computed(() => ({
        text: url.value,
    }));

    const createShortLink = async (link) => {
        const params = {
            url: link
        };

        await axios.post('https://go.rovr.live/shortlink', params)
            .then(response => {
                if(response.data && response.data.short_url) {
                    url.value = response.data.short_url;
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const copy = () => {
        if(url.value) {
            navigator.clipboard.writeText(url.value)
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
    }
</script>

<style lang="scss" scoped>
    .share-popup {
        @include flex-center;
        backdrop-filter: blur(10px);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        transition: opacity 0.5s linear;
        &__content {
            position: relative;
            max-width: 700px;
            width: 95%;
            padding: 1.5rem;
            background-color: $black;
            height: auto;
            border-radius: 0.75rem;
            box-shadow: 2px 2px 10px rgba(255, 240, 87, 0.25);
            border: 1px solid $primary;
        }
        &__header {
            @include flex-center-sb;
        }
        &__logo {
            width: 7rem;
        }
        &__close {
            cursor: pointer;
        }
        &__preview {
            @include flex-center-vert;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background-color: $primary;
            border-radius: 0.5rem;
            margin-top: 2rem;
        }
        &__cover {
            margin-right: 1rem;
            img {
                width: 6.5rem;
                aspect-ratio: 1;
                border-radius: 0.75rem;
            }
        }
        &__details {
            color: $black;
        }
        &__title {
            @include font-size(24px);
            margin: 0 0 0.5rem;
            line-height: 1;
        }
        &__artist {
            @include font-size(14px);
            margin: 0;
            line-height: 1;
            em {
                @include font-size(24px);
                line-height: 1;
                margin-left: 2px;
            }
        }
        &__source {
            @include font-size(12px);
            display: block;
            text-transform: uppercase;
            margin-bottom: 0.625rem;
            line-height: 1;
        }
        &__tip {
            @include font-size(20px);
            color: $primary;
            margin: 0 0 1.5rem 0;
            text-align: center;
        }
        &__links {
            @include flex-center;
            margin-bottom: 2rem;
            & > * {
                img {
                    width: 4rem;
                    aspect-ratio: 1;
                }
                &:not(:last-child) {
                    margin-right: 2rem;
                }
            }
        }
        &__copy {
            margin-top: -0.75rem;
            text-align: center;
            button {
                margin: 1.25rem auto 0 auto;
                width: 4rem;
                img {
                    width: 1.75rem;
                }
            }
        }
        &__link {
            display: inline-block;
            position: relative;
            text-align: center;
            span {
                color: #A09F9B;
                font-size: 14px;
                cursor: pointer;
                font-weight: normal;
                &.hide {
                    opacity: 0;
                } 
            }
        }
        &__success {
            @include flex-center;
            padding: 0.25rem;
            background-color: $primary;
            color: $black;
            font-size: 12px;
            position: absolute;
            top: -5px;
            left: 0;
            width: 100%;
            height: 2rem;
            border-radius: 0.25rem;
            margin: 0;
            line-height: 1;
        }
    }

    @media screen and (max-width: 480px) {
        .share-popup {
            backdrop-filter: blur(12px);
            &__content {
                border-radius: 0.75rem;
                padding: 1.5rem;
            }
            &__close {
                img {
                    width: 1.5rem;
                }
            }
        }
    }
</style>