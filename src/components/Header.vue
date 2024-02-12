<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
    <header class="header">
        <div class="header__logo">
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
    const links = [
        {
            id: 0,
            name: "about",
            path: "/about"
        },
        {
            id: 1,
            name: "radio",
            path: "/radio"
        },
        {
            id: 2,
            name: "schedule",
            path: "/schedule"
        }, {
            id: 3,
            name: "curators",
            path: "/curators"
        }
    ]
</script>

<style lang="scss" scoped>
    .header {
        @include flex-center-sb;
        background-color: $black;
        padding: 1.5rem 3.75rem;
        border-bottom: 2px solid $primary;
        &__logo {
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
                    text-decoration: none;
                    color: $primary;
                    font-weight: normal;
                    font-style: italic;
                    text-transform: uppercase;
                    opacity: 0.35;
                    &.router-link-exact-active {
                        opacity: 1;
                    }
                }
            }
        }
    }
</style>