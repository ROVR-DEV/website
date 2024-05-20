<template>
    <section class="curators" v-if="!showCuratorInfo">
        <curator v-for="curator in sortedCurators" :key="curator.id" :curator="curator" @click="openCuratorInfo(curator)"/>
    </section>

    <curator-info v-else :curator="selectedCurator" @close="closeCuratorInfo"/>
</template>

<script setup>
    import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
    import { useCuratorsStore } from '@/stores/curators';
    import Curator from '@/components/Curator.vue';
    import CuratorInfo from '@/components/CuratorInfo.vue';

    const curatorsStore = useCuratorsStore();
    const curators = ref(curatorsStore.curators);
    const showCuratorInfo = ref(false);
    const selectedCurator = ref(null);

    // saving scroll position when closing curator-info
    const scrollPosition  = ref(0);
    const main = document.querySelector('.main');

    watch(() => curatorsStore.curators, (state) => {
        if (state) curators.value = state;
    });

    const openCuratorInfo = (data) => {
        showCuratorInfo.value = true;
        selectedCurator.value = data;
    }

    const closeCuratorInfo = () => {
        showCuratorInfo.value = false;
        selectedCurator.value = null;
        
        // setting scroll position
        nextTick(() => {
            main.scrollTop = scrollPosition.value;
        });
    }

    const sortedCurators = computed(() => {
        if (curators.value) {
            return curators.value.slice().sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                return nameA.localeCompare(nameB);
            });
        } else {
            return [];
        }
    });

    onMounted(() => {
        main.addEventListener('scroll', saveScrollPosition);
    });

    onUnmounted(() => {
        main.removeEventListener('scroll');
    });

    const saveScrollPosition = () => {
        if(!showCuratorInfo.value) scrollPosition.value = main.scrollTop;
    }
</script>

<style lang="scss" scoped>
    .curators {
        @include grid(2, 0);
        height: auto;
        @media screen and (max-width: 1024px) {
            grid-template-columns: 1fr;
        }
    }
</style>