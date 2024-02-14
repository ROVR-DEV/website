<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
    <header class="header">
        <div class="header__logo" v-press="{ time: 200, scale: 0.97 }" @click="redirect(200)">
            <img src="@/assets/images/logo.svg" alt="Logo">
        </div>

        <nav class="header__nav">
            <ul class="header__links">
                <li v-for="link in links" :key="link.id"><router-link :to="link.path" v-text="link.name"/></li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
    import router from '@/router';

    const links = [
        {
            id: 0,
            name: "radio",
            path: "/radio"
        },
        {
            id: 1,
            name: "about",
            path: "/about"
        },
        {
            id: 2,
            name: "schedule",
            path: "/schedule"
        },
        {
            id: 3,
            name: "curators",
            path: "/curators"
        }
    ]

    const redirect = (delay) => {
        setTimeout(() => router.push({ name: 'radio' }), delay);
    }
</script>

<style lang="scss" scoped>
    .header {
        @include flex-center-sb;
        background-color: $black;
        padding: 1.5rem 3.75rem;
        border-bottom: 2px solid $primary;
        &__logo {
            cursor: pointer;
            img {
                width: 8rem;
            }
        }
        &__links {
            @include flex-center-vert;
            li {
                &:not(:last-child) {
                    margin-right: 3.25rem;
                }
                a {
                    @include font-size(18px);
                    background-image: linear-gradient(
                        to right,
                        $primary,
                        $primary 50%,
                        rgba($color: $primary, $alpha: 0.35) 50%
                    );
                    background-size: 200% 100%;
                    background-position: -101%;
                    text-decoration: none;
                    color: rgba($color: $primary, $alpha: 0.35);
                    font-weight: normal;
                    font-style: italic;
                    text-transform: uppercase;
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    transition: all 0.2s ease-in-out;
                    &.router-link-exact-active,
                    &:hover {
                        background-position: 0;
                    }
                }
            }
        }
    }
</style>