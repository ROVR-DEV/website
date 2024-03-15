<template>
    <div class="download-popup">
        <div class="download-popup__content">
            <div class="download-popup__image"/>
            <div class="download-popup__info">
                <img src="@/assets/images/icons/close.svg" class="download-popup__close" alt="close" @click="emit('close')">

                <img src="@/assets/images/logo/logo.svg" class="download-popup__logo" alt="Logo">
                <h1>DOWNLOAD <br> THE APP</h1>
                <p>Get full access to the Radio, Mood Channels, Archive Library and easily keep track of all your favorite tunes, shows and curators. </p>
                <h2>ABSOLUTELY FREE</h2>
                <div class="download-popup__links">
                    <a href="https://apps.apple.com/app/id6448372142" target="_blank" class="download-popup__link">
                        <img src="@/assets/images/icons/app-store.svg" alt="App Store">
                        App Store
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.rovr.live" target="_blank" class="download-popup__link">
                        <img src="@/assets/images/icons/google-play.svg" alt="Google Play">
                        Google Play
                    </a>
                </div>
                <div class="download-popup__links mobile">
                    <a href="https://onelink.to/rovr" target="_blank" class="download-popup__link">
                        <img src="@/assets/images/icons/app-store.svg" alt="App Store">
                        App Store
                    </a>
                    <a href="https://onelink.to/rovr" target="_blank" class="download-popup__link">
                        <img src="@/assets/images/icons/google-play.svg" alt="Google Play">
                        Google Play
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const emit = defineEmits(['close']);
</script>

<style lang="scss" scoped>
    .download-popup {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color: $primary;
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            background-color: rgba($color: #000000, $alpha: 0.5);
            z-index: 1;
        }
        &__content {
            @include grid(2, 0);
            max-width: 1050px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
            height: 85%;
            width: 95%;
        }
        &__image {
            background-image: url('../assets/images/app-bg.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-color: $primary;
        }
        &__info {
            @include flex-center-column;
            background-color: #161616;
            text-align: center;
            padding: 3rem 2rem;
            color: $primary;
            h1 {
                font-size: 3vw;
                text-transform: uppercase;
                margin: 3rem 0;
                line-height: 1;
            }
            p {
                font-size: 1.25vw;
                font-family: 'GT Alpina', sans-serif;
                font-style: italic;
                margin: 0 0 2rem 0;
            }
            h2 {
                font-size: 1.625vw;
                text-transform: uppercase;
                margin: 0 0 4rem 0;
                line-height: 1;
            }
        }
        &__logo {
            margin: 0 auto 1.5rem auto;
            width: 8vw;
        }
        &__links {
            @include flex-center;
            &.mobile {
                display: none;
            }
        }
        &__link {
            @include flex-center-horiz;
            align-items: flex-end;
            font-size: 1.25vw;
            font-weight: bold;
            text-decoration: none;
            color: $primary;
            &:not(:last-child) {
                margin-right: 2rem;
            }
            img {
                margin-right: 0.5rem;
                width: 1.5rem;
            }
        }
        &__close {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            cursor: pointer;
        }

        @media screen and (max-width: 1600px) {
            &__content {
                height: 80%;
            }
            &__info {
                h1 {
                    line-height: 1.1;
                    margin: 2rem 0;
                }
                p {
                    margin: 0;
                }
                h2 {
                    margin: 2rem 0;
                }

            }
        }

        @media screen and (max-width: 768px) {
            &__content {
                grid-template-columns: 1fr;
            }
            &__image {
                display: none;
            }
            &__logo {
                width: auto;
            }
            &__info {
                border: 1px solid $primary;
                border-radius: 1rem;
                h1 {
                    @include font-size(52px);
                }
                p {
                    @include font-size(26px);
                }
                h2 {
                    @include font-size(30px);
                }
            }
            &__links {
                &:not(.mobile) {
                    display: none;
                }
                &.mobile {
                    display: flex;
                }
            }
            &__link {
                @include font-size(18px);
                align-items: center;
            }
            &__close {
                width: 1.5rem;
            }
        }
    }
</style>