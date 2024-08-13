<template>
    <section class="curators">
        <CuratorsList v-if="curators" :items="sortedCurators"/>
    </section>
</template>

<script setup>
    import { ref, computed, watch } from 'vue';
    import { useCuratorsStore } from '@/stores/curators';
    import CuratorsList from '@/components/curators/CuratorsList.vue';

    const curatorsStore = useCuratorsStore();
    const curators = ref(null);

    const sortedCurators = computed(() => {
        if (curators.value) {
            return curators.value.slice().sort((a, b) => a.name.localeCompare(b.name));
        }
        return [];
    });

    watch(() => curatorsStore.curators, (newValue) => {
        if(newValue) curators.value = newValue;
    }, { immediate: true });
</script>

<style scoped>
    .curators {
        padding: 0;
    }
</style>
