<template>
    <teleport to="#modal">
        <div class="share-popup popup" v-if="metadata">
            <div class="share-popup__content" ref="target">
                <div class="share-popup__close" @click="emit('close')">
                    <img src="@/assets/images/icons/close-small.svg" alt="close">
                </div>

                <div class="share-popup__preview">
                    <div class="share-popup__cover">
                        <img :src="metadata.cover" alt="cover">
                    </div>
                    <div class="share-popup__details">
                        <span class="share-popup__source" v-text="metadata.source"/>
                        <h3 v-text="metadata.title" class="share-popup__title"/>
                        <h4 class="share-popup__artist">BY <em v-text="metadata.artist"/></h4>
                    </div>
                </div>

                <p class="share-popup__tip">Share on:</p>

                <div class="share-popup__links">
                    <s-facebook :share-options="facebookShareOptions" @click="console.log(facebookShareOptions.url)">
                        <img src="@/assets/images/icons/social-media/facebook.png">
                    </s-facebook>

                    <s-telegram :share-options="telegramShareOptions" @click="console.log(telegramShareOptions.url)">
                        <img src="@/assets/images/icons/social-media/telegram.png">
                    </s-telegram>

                    <s-twitter :share-options="twitterShareOptions" @click="console.log(twitterShareOptions.url)">
                        <img src="@/assets/images/icons/social-media/twitter.png">
                    </s-twitter>
                </div>

                <p class="share-popup__tip">Or copy the link:</p>

                <div class="share-popup__copy">
                    <transition name="fade">
                        <p v-if="copySuccess" class="share-popup__success">Link copied to clipboard!</p>
                    </transition>

                    <input
                        type="text"
                        class="share-popup__input"
                        :class="{ hide: copySuccess }"
                        :value="url"
                        readonly
                        @click="copy">

                    <button @click="copy" :class="{ hide: copySuccess }">
                        <img src="@/assets/images/icons/copy.svg" alt="copy">
                    </button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { SFacebook, STelegram, STwitter } from 'vue-socials';
    import { onClickOutside } from '@vueuse/core'

    const currentUrl = new URL(window.location.href);
    const url = ref(null);
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
            url.value = `${currentUrl.origin}/#/show/${props.id}`;
        }
    });

    const facebookShareOptions = computed(() => ({
        url: url.value,
        quote: `ROVR Archive: ${props.metadata.title} by ${props.metadata.artist}`,
        hashtag: '#Radio',
    }));

    const telegramShareOptions = computed(() => ({
        url: url.value,
        text: `ROVR Archive: ${props.metadata.title} by ${props.metadata.artist}`,
    }));

    const twitterShareOptions = computed(() => ({
        url: url.value,
        text: `ROVR Archive: ${props.metadata.title} by ${props.metadata.artist}`,
        hashtags: ['Radio', 'Music'],
    }));

    const copy = () => {
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
            padding: 3rem;
            background-color: $black;
            height: auto;
            border-radius: 2rem;
            box-shadow: 2px 2px 10px rgba(255, 240, 87, 0.25);
            border: 1px solid $primary;
        }
        &__close {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            cursor: pointer;
        }
        &__preview {
            @include flex-center-vert;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background-color: $primary;
            border-radius: 1rem;
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
                width: 4rem;
                &:not(:last-child) {
                    margin-right: 2rem;
                }
            }
        }
        &__copy {
            @include flex-center;
            position: relative;
            button {
                @include flex-center;
                background-color: $primary;
                padding: 0.25rem;
                cursor: pointer;
                width: 3.5rem;
                aspect-ratio: 1;
                border-radius: 50%;
                img {
                    width: 1.75rem;
                }
            }
            & > *.hide {
                opacity: 0;
            } 
        }
        &__input {
            font-size: 16px;
            display: block;
            background-color: transparent;
            color: $primary;
            font-weight: normal;
            -webkit-appearance: none;
            appearance: none;
            padding: 1rem 0;
            border: none;
            outline: none;
            border-bottom: 1px solid $primary;
            margin-right: 1.5rem;
            width: 300px;
            cursor: pointer;
        }
        &__success {
            @include font-size(16px);
            @include flex-center;
            padding: 1rem;
            background-color: $primary;
            color: $black;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            margin: 0;
            line-height: 1;
        }
    }

    @media screen and (max-width: 480px) {
        .share-popup {
            backdrop-filter: blur(12px);
            &__content {
                border-radius: 1.5rem;
                padding: 2rem;
            }
            &__close {
                top: 1.25rem;
                img {
                    width: 1.5rem;
                }
            }
        }
    }
</style>