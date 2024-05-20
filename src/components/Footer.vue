<template>
    <footer class="footer">
        <a href="https://www.instagram.com/rovr_live/" target="_blank" class="footer__instagram"><img src="@/assets/images/icons/instagram.svg" alt="instagram"></a>
        <a href="https://apps.apple.com/app/id6448372142" target="_blank" class="footer__appstore">
            <img src="@/assets/images/icons/app-store.svg" alt="icon">
            App Store
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.rovr.live" target="_blank" class="footer__googleplay">
            <img src="@/assets/images/icons/google-play.svg" alt="icon">
            Google Play
        </a>
        <a href="https://onelink.to/rovr" target="_blank" class="footer__appstore mobile">
            <img src="@/assets/images/icons/app-store.svg" alt="icon">
            App Store
        </a>
        <a href="https://onelink.to/rovr" target="_blank" class="footer__googleplay mobile">
            <img src="@/assets/images/icons/google-play.svg" alt="icon">
            Google Play
        </a>
        <router-link to="/privacy" class="footer__privacy">Privacy Notice</router-link>
        <router-link to="/terms" class="footer__terms">Terms & Conditions</router-link>
        <a href="mailto:info@rovr.live" class="footer__contact">Contact</a>
        <p class="footer__copyright">© 2024 ROVR | All rights reserved</p>
        <p class="footer__copyright--mobile">© 2024 ROVR <br> All rights reserved</p>
    </footer>
</template>

<style lang="scss" scoped>
    .footer {
        @include flex(row, center, flex-end);
        background-color: $black;
        padding: 1.5rem 3.75rem;
        border-top: 2px solid $primary;
        & > * {
            @include font-size(10px);
            @include flex-center;
            color: $primary;
            font-weight: bold;
            text-decoration: none;
            margin: 0;
            line-height: 0;
            letter-spacing: 0.2px;
            &:not(:last-child) {
                margin-right: 2.25rem;
            }
            &.mobile {
                display: none;
            }
            &:first-child {
                img {
                    width: 1.5rem;
                }
            }
            img {
                margin-right: 6px;
            }
        }
        &__copyright {
            &--mobile {
                display: none;
            }
        }
    }
</style>