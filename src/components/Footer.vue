<template>
    <footer class="footer">
        <a href="#"><img src="@/assets/images/icons/instagram.svg" alt="instagram"></a>
        <a href="#">
            <img src="@/assets/images/icons/app-store.svg" alt="App Store">
            App Store
        </a>
        <a href="#">
            <img src="@/assets/images/icons/google-play.svg" alt="Google Play">
            Google Play
        </a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Contact</a>
        <p>© 2024 ROVR | All rights reserved</p>
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
            line-height: 1;
            letter-spacing: 0.2px;
            &:not(:last-child) {
                margin-right: 2.25rem;
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
    }
</style>