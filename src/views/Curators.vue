<template>
    <section class="curators" v-if="!showCuratorInfo">
        <curator v-for="curator in sortedCurators" :key="curator.id" :curator="curator" @click="openCuratorInfo(curator)"/>
    </section>

    <curator-info v-else :curator="selectedCurator" @close="closeCuratorInfo"/>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useCuratorsStore } from '@/stores/curators';
    import Curator from '@/components/Curator.vue';
    import CuratorInfo from '@/components/CuratorInfo.vue';

    const curatorsStore = useCuratorsStore();
    const curators = ref(curatorsStore.curators);
    const showCuratorInfo = ref(false);
    const selectedCurator = ref(null);

    const openCuratorInfo = (data) => {
        showCuratorInfo.value = true;
        selectedCurator.value = data;
        console.log(data);
    }

    const closeCuratorInfo = () => {
        showCuratorInfo.value = false;
        selectedCurator.value = null;
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
</script>

<style lang="scss" scoped>
    .curators {
        @include grid(2, 0);
        height: auto;
        @media screen and (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }
</style>