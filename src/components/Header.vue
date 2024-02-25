<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
    <header class="header">
        <div @click="router.push({name:'radio'})" class="header__logo">
            <img ref="logo" :src="logoImage" alt="Logo">
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

    import logoImage from '@/assets/images/logo/logo.svg';
    import logoSticky from '@/assets/images/logo/logo_sticky.svg';
    import logoImageAnimated from '@/assets/images/logo/player_logo.gif';
    import logoImageAnimatedOff from '@/assets/images/logo/player_logo_off.gif';

    const router = useRouter();
    const route  = useRoute();

    const playerStore = usePlayerStore();
    const isBurgerActive = ref(false);
    const logo = ref(null);

    watch(route, () => {
        if (router.currentRoute.value.name !== 'radio' && playerStore.isPlaying) {
            if (!logo.value.parentNode.classList.contains('header__logo--sticky')) {
                logo.value.setAttribute('src', logoImageAnimated);

                logo.value.onload = () => {
                    setTimeout(() => {
                        playerStore.toggleStickyPlayer(true);

                        if (!logo.value.parentNode.classList.contains('header__logo--sticky')) {
                            logo.value.setAttribute('src', logoSticky);
                            logo.value.parentNode.classList.add('header__logo--sticky');
                        }
                    }, 900);
                };
            }
        } else {
            playerStore.toggleStickyPlayer(false);

            if (playerStore.isPlaying) {
                setTimeout(() => {
                    logo.value.setAttribute('src', logoImageAnimatedOff);
                    logo.value.onload = () => {
                        setTimeout(() => {
                            logo.value.setAttribute('src', logoImage);
                            logo.value.parentNode.classList.remove('header__logo--sticky');
                        }, 1200);
                    }
                }, 500);
            }
        }
    });


    watch(() => playerStore.isPlaying, (state) => {
        if (!state) {
            if (playerStore.show_sticky_player) {
                playerStore.toggleStickyPlayer(false);

                setTimeout(() => {
                    logo.value.setAttribute('src', logoImageAnimatedOff);
                    logo.value.onload = () => {
                        setTimeout(() => {
                            logo.value.setAttribute('src', logoImage);
                            logo.value.parentNode.classList.remove('header__logo--sticky');
                        }, 1200);
                    }
                }, 500);


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
        {
            id: 6,
            name: "terms",
            title: "Privacy Policy  |  Terms & Conditions",
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
            img {
                width: 8rem;
                height: 2.875rem;
            }
            &--sticky {
                margin-right: 1rem;
                img {
                    width: auto;
                    height: 2.875rem;
                }
            }
        }
        &__links {
            @include flex-center-vert;
        }
        &__link {
            &:not(:last-child) {
                margin-right: 3rem;
            }
            a {
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