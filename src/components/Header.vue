<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
    <header class="header">
        <header-logo @pressed="isBurgerActive = false"/>

        <transition name="fade">
            <sticky-player v-if="playerStore.show_sticky_player"/>
        </transition>

        <nav class="header__nav" :class="{ 'header__nav--active': isBurgerActive }">
            <ul class="header__links">
                <li v-for="link in links" :key="link.id" class="header__link" :class="`header__link-${link.name}`">
                    <template v-if="link.name === 'contact'">
                        <a href="mailto:info@rovr.live" v-text="link.name"/>
                    </template>
                    <template v-else-if="link.name === 'archive'">
                        <router-link
                            :to="{ name: link.name }"
                            :class="{ 'router-link-active' : router.currentRoute.value.name === 'show' || router.currentRoute.value.name === 'archive' }"
                            v-text="link.title" 
                            @click="handleArchiveLink"
                        />
                    </template>
                    <template v-else>
                        <router-link :to="{ name: link.name }" v-text="link.title" @click="isBurgerActive = false"/>
                    </template>
                </li>
                <div class="header__link header__link-terms" ref="headerPrivacy">
                    <router-link to="/privacy" @click="isBurgerActive = false">Privacy Notice</router-link>
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
    import HeaderLogo from './HeaderLogo.vue';
    import StickyPlayer from './StickyPlayer.vue';

    const router = useRouter();
    const route  = useRoute();

    const playerStore = usePlayerStore();
    const isBurgerActive = ref(false);
    const archiveRouteHistory = ref(null);
    const headerPrivacy = ref(null);

    watch(route, () => {
        if (router.currentRoute.value.name === 'terms' || router.currentRoute.value.name === 'privacy') {
            headerPrivacy.value.classList.add('active');
        } else {
            headerPrivacy.value.classList.remove('active');
        }

        if (router.currentRoute.value.name === 'show' || router.currentRoute.value.name === 'archive') {
            archiveRouteHistory.value = router.currentRoute.value.path;
        }
    });

    const handleArchiveLink = () => {
        if (archiveRouteHistory.value) router.push(archiveRouteHistory.value);
        else router.push('/archive');

        isBurgerActive.value = false;
    }

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
            name: "archive",
            title: "archive",
        },
        {
            id: 5,
            name: "contact",
            title: "contact",
        },
        {
            id: 6,
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
        flex: 1 0 6.25rem;
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
                &:hover,
                &.router-link-active {
                    color: $primary;
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
    }
</style>