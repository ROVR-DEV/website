<template>
    <section class="curator" v-if="curator">
        <close-button class="curator__close"/>

        <div class="curator__photo">
            <img :src="curatorPhoto" :alt="curator.name">
        </div>
        
        <div class="curator__info">
            <div class="faux-crop">
                <img :src="curatorPhoto" :alt="curator.name">
            </div>

            <div class="curator__details">
                <h1 class="curator__name" v-text="curator.name" />
                <p class="curator__about" v-text="curator.about" />
            </div>

            <div class="curator__links" v-if="curator.links">
                <a class="curator__link" v-for="(link, index) in links" :key="index" :href="link.href" target="_blank">
                    <img v-if="link.name === 'instagram'" src="@/assets/images/links/instagram.svg" alt="instagram">
                    <img v-else-if="link.name === 'twitter'" src="@/assets/images/links/twitter.svg" alt="twitter">
                    <img v-else-if="link.name === 'website'" src="@/assets/images/links/website.svg" alt="website">
                </a>
                <router-link :to="{ name: 'archive', query: { curator: curator.name } }" class="curator__link">
                    <img src="@/assets/images/links/archive.svg" alt="archive">
                </router-link>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
    import { useCuratorsStore } from '@/stores/curators';
    import CloseButton from '@/components/ui/CloseButton.vue';

    const curator = ref(null);
    const curatorsStore = useCuratorsStore();

    const props = defineProps({
        name: {
            type: String,
            required: true,
        }
    });

    onMounted(() => {
        getCurator();
        window.addEventListener('resize', updateScreenWidth);
    });

    const formatName = (name) => {
        return name
            .normalize("NFD") // Normalize to NFD form (decomposed)
            .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
            .replace(/-/g, ' ') // Replace hyphens with spaces
            .toLowerCase(); // Convert to lowercase
    }

    watch(() => props.name, (newName, oldName) => {
        if(newName !== oldName) getCurator();
    });

    const getCurator = () => {
        const formattedName = formatName(props.name);

        if (curatorsStore.curators) {
            curator.value = curatorsStore.curators.find(curator => formatName(curator.name) === formattedName);
            getCuratorLinks();
        } else {
            watch(() => curatorsStore.curators, (state) => {
                if (state) {
                    curator.value = curatorsStore.curators.find(curator => formatName(curator.name) === formattedName);
                    getCuratorLinks();
                }
            });
        }
    }

    const links = ref([]);
    const otherServices = ['bandcamp', 'youtube', 'soundcloud', 'mixcloud', 'deezer'];

    const getCuratorLinks = () => {
        links.value = [];

        if (curator.value && curator.value.links && curator.value.link_titles) {
            for (let i = 0; i < curator.value.links.length; i++) {
                links.value.push({ href: curator.value.links[i], name: curator.value.link_titles[i].toLowerCase() });
            }
        }

        for (let i = links.value.length - 1; i >= 0; i--) {
            if (links.value[i].name === 'linktree') {
                links.value[i].name = 'website';
            } else if (otherServices.includes(links.value[i].name)) {
                links.value.splice(i, 1);
            }
        }
    }

    const screenWidth = ref(window.innerWidth);

    const updateScreenWidth = () => {
        screenWidth.value = window.innerWidth;
    }

    onUnmounted(() => {
        window.removeEventListener('resize', updateScreenWidth);
    });

    const curatorPhoto = computed(() => {
        if (screenWidth.value < 1024) {
            return curator.value.photo;
        } else {
            return curator.value.shows[0].cover_desktop ?? curator.value.photo;
        }
    });
</script>

<style lang="scss" scoped>
    .curator {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: $black;
        z-index: 5;
        overflow: hidden;
        &__close {
            position: absolute;
            top: 3rem;
            left: 3rem;
            z-index: 3;
        }
        &__photo {
            flex: 1 0 45%;
            position: relative;
            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top;
                position: relative;
                z-index: 1;
            }
            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 80%;
                background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.85) 80%);
                z-index: 2;
            }
        }
        &__info {
            @include flex(row, flex-start, space-between);
            flex: auto;
            padding: 4.5rem 2.5rem 4.5rem 4.5rem;
            color: $primary;
            overflow: hidden;
        }
        &__details {
            @include flex-column;
            height: 100%;
        }
        .faux-crop {
            display: none;
        }
        &__name {
            @include font-size(100px);
            font-family: 'GT Alpina', sans-serif;
            stroke: 1px solid $primary;
            font-style: italic;
            margin: 0 0 2rem 0;
            line-height: 1;
            user-select: text;
        }
        &__about {
            @include font-size(18px);
            font-weight: normal;
            margin: 0;
            line-height: 1.25;
            white-space: pre-line;
            overflow: auto;
            user-select: text;
            &::-webkit-scrollbar {
                width: 0.25rem;
            }
        }
        &__links {
            margin-left: 1rem;
        }
        &__link {
            @include flex-center;
            text-decoration: none;
            border-radius: 50%;
            background-color: $black;
            border: 1px solid $primary;
            width: 2.5rem;
            aspect-ratio: 1;
            transition: $transition;
            img {
                width: 1.25rem;
                transition: $transition;
            }
            &:not(:last-child) {
                margin-bottom: 1.25rem;
            }
            @media screen and (min-width: 768px) {
                &:hover {
                    background-color: $primary;
                    img {
                        filter: brightness(0);
                    }
                }
            }
            @media screen and (max-width: 1024px) {
                &:active {
                    background-color: $primary;
                    img {
                        filter: brightness(0);
                    }
                }
            }
        }
    }
</style>