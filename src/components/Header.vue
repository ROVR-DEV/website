<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
    <header class="header">
        <div class="header__logo" :class="{'header__logo--sticky' : playerStore.show_sticky_player}" @click="router.push({ name: 'radio' }); isBurgerActive = false">
            <img v-show="!playerStore.show_sticky_player" src="@/assets/images/logo/logo.svg" alt="Logo">
            <img v-show="playerStore.show_sticky_player" src="@/assets/images/logo/logo_sticky.svg" alt="Logo">
        </div>

        <transition name="fade">
            <sticky-player v-if="playerStore.show_sticky_player"/>
        </transition>

        <nav class="header__nav" :class="{'header__nav--active' : isBurgerActive}">
            <ul class="header__links">
                <li v-for="link in links" :key="link.id" class="header__link" :class="`header__link-${link.name}`">
                    <template v-if="link.name === 'contact'">
                        <a href="mailto:info@rovr.live" v-text="link.name"/>
                    </template>
                    <template v-else>
                        <router-link :to="{ name: link.name }" v-text="link.title" @click="isBurgerActive = false"/>
                    </template>
                </li>
                <div class="header__link header__link-terms" ref="headerPrivacy">
                    <router-link to="/privacy" @click="isBurgerActive = false">Privacy Policy</router-link>
                    <span>|</span>
                    <router-link to="/terms" @click="isBurgerActive = false">Terms & Conditions</router-link>
                </div>
            </ul>
        </nav>

        <div
            class="header__burger"
            @click="isBurgerActive = !isBurgerActive"
            :class="{ 'header__burger--active': isBurgerActive }">
            <span/>
        </div>
    </header>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';
    import { useRouter, useRoute } from 'vue-router';
    import StickyPlayer from './StickyPlayer.vue';

    const router = useRouter();
    const route  = useRoute();

    const playerStore = usePlayerStore();
    const isBurgerActive = ref(false);
    
    const headerPrivacy = ref(null);

    watch(route, () => {
        if (router.currentRoute.value.name !== 'radio' && playerStore.isPlaying) {
            playerStore.toggleStickyPlayer(true);
        } else {
            playerStore.toggleStickyPlayer(false);
        }

        if(router.currentRoute.value.name === 'terms' || router.currentRoute.value.name === 'privacy') {
            headerPrivacy.value.classList.add('active');
        } else {
            headerPrivacy.value.classList.remove('active');
        }
    });


    watch(() => playerStore.isPlaying, (state) => {
        if (!state) {
            if (playerStore.show_sticky_player) {
                playerStore.toggleStickyPlayer(false);
            }
        }
    });

    const links = [
        {
            id: 0,
            name: "radio",
            title: "radio",
        },
        {
            id: 1,
            name: "about",
            title: "about",
        },
        {
            id: 2,
            name: "schedule",
            title: "schedule",
        },
        {
            id: 3,
            name: "curators",
            title: "curators",
        },
        {
            id: 4,
            name: "contact",
            title: "contact",
        },
        {
            id: 5,
            name: "shop",
            title: "shop",
        },
    ]
</script>

<style lang="scss" scoped>
    .header {
        @include flex-center-sb;
        background-color: $black;
        padding: 1.5rem 3.75rem;
        border-bottom: 2px solid $primary;
        flex: 1 0 100px;
        @media screen and (max-width: 1400px) {
            flex: 1 0 80px;
        }
        &__logo {
            cursor: pointer;
            margin-right: 0.75rem;
            img {
                height: 3.25rem;
            }
        }
        &__links {
            @include flex-center-vert;
        }
        &__link {
            &:not(:last-child) {
                margin-right: 3rem;
            }
            & > a {
                @include font-size(18px);
                text-decoration: none;
                color: rgba($color: $primary, $alpha: 0.35);
                font-weight: normal;
                font-style: italic;
                text-transform: uppercase;
                transition: all 0.2s ease-in-out;
                @media screen and (min-width: 769px) {
                    background-image: linear-gradient(
                        to right,
                        $primary,
                        $primary 50%,
                        rgba($color: $primary, $alpha: 0.35) 50%
                    );
                    background-size: calc(200% + 5px) 100%;
                    background-position: calc(100% + 0.5px);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    &.router-link-exact-active,
                    &:hover {
                        background-position: 0;
                    }
                }
            }
            &-contact,
            &-terms {
                display: none;
            }
        }
        &__burger {
            display: none;
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 0.5s linear;
        }

        .fade-enter-from,
        .fade-leave-to {
            opacity: 0;
        }
    }
</style>