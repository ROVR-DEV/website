<template>
    <section class="about">
        <div class="container">
            <div class="about__content">
                <div class="about__text">
                    <p>24/7 MUSIC</p>
                    <p>NO INTERRUPTIONS</p>
                    <p>QUALITY SELECTORS</p>
                    <p>TIMEZONED SELECTIONS</p>
                    <p>ANTI ALGORITHM</p>
                </div>
                <div class="about__logo">
                    <img src="@/assets/images/logo_black.svg" alt="logo">
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

</script>

<style lang="scss">
    .about {
        @include flex-center-column;
        background-color: $primary;
        &__content {
            text-align: center;
        }
        &__text {
            p {
                @include font-size(60px);
                color: $black;
                text-transform: uppercase;
                margin: 0;
                font-weight: bold;
                line-height: 1;
                @media screen and (max-width: 480px) {
                    @include font-size(36px);
                    &:not(:last-child) {
                        margin-bottom: 2.25rem;
                    }
                }
            }
        }
        &__logo {
            display: inline-block;
            margin-top: 6.5rem;
            width: 13rem;
            @media screen and (max-width: 1600px) {
                margin-top: 3.5rem;
            }
        }
    }
</style>