<template>
    <section class="curator">
        <div class="curator__close" v-press="{ time: 200, scale: 0.95 }" @click="close(300)">
            <img src="@/assets/images/icons/arrow-left.svg" alt="back">
        </div>
        <div class="curator__photo">
            <img :src="curator.photo" :alt="curator.name">
        </div>
        <div class="curator__info">
            <div class="curator__details">
                <h1 class="curator__name" v-text="curator.name"/>
                <p class="curator__about" v-text="curator.about"/>
            </div>
            <div class="curator__links" v-if="curator.links">
                <a class="curator__link" v-for="(link, index) in links" :key="index" :href="link.href" target="_blank">
                    <img v-if="link.name === 'instagram'" src="@/assets/images/links/instagram.svg"  alt="instagram">
                    <img v-else-if="link.name === 'twitter'" src="@/assets/images/links/twitter.svg" alt="twitter">
                    <img v-else-if="link.name === 'website'" src="@/assets/images/links/website.svg" alt="website">
                </a>
            </div>
        </div>
    </section>
</template>

<script setup>
    const props = defineProps({
        curator: {
            type: Object,
            required: true
        }
    });

    const emit = defineEmits(['close']);

    let links = [];

    for (let i = 0; i < props.curator.links.length; i++) {
        links.push({ href: props.curator.links[i], name: props.curator.link_titles[i].toLowerCase() });
    }

    links.forEach((link) => {
        if(link.name === 'linktree') {
            link.name = 'website';
        }
    });

    const close = (delay) => {
        setTimeout(() => emit('close'), delay);
    }
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
        &__close {
            @include flex-center;
            width: 2.75rem;
            aspect-ratio: 1;
            background-color: $primary;
            border-radius: 50%;
            cursor: pointer;
            position: absolute;
            top: 3rem;
            left: 3rem;
            z-index: 3;
            img {
                width: 1.5rem;
            }
        }
        &__photo {
            flex: 1 0 45%;
            position: relative;
            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
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
            overflow-y: auto;
        }
        &__name {
            @include font-size(100px);
            font-family: 'GT Alpina', sans-serif;
            stroke: 1px solid $primary;
            font-style: italic;
            margin: 0 0 3.5rem 0;
            line-height: 1;
        }
        &__about {
            @include font-size(18px);
            font-weight: normal;
            margin: 0;
            line-height: 1.25;
            white-space: pre-line;
        }
        &__details {
            flex: 0 1 75%;
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
            &:hover {
                background-color: $primary;
                img {
                    filter: brightness(0);
                }
            }
        }
    }
</style>