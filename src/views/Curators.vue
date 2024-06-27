<template>
    <section class="curators">
        <curator v-for="curator in sortedCurators" :key="curator.id" :curator="curator" @click="$router.push(`/curator/${slugify(curator.name)}`)"/>
    </section>
</template>

<script setup>
    import { ref, computed, watch } from 'vue';
    import { useCuratorsStore } from '@/stores/curators';
    import { slugify } from '@/utils/slugify';
    import Curator from '@/components/Curator.vue';

    const curatorsStore = useCuratorsStore();
    const curators = ref(curatorsStore.curators);

    watch(() => curatorsStore.curators, (state) => {
        if (state) curators.value = state;
    });

    watch(() => curatorsStore.isPopupShown, (status) => {
        if (!status) {
            document.querySelector('.main').scrollTop = curatorsStore.scrollPosition;
        }
    });

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
        @media screen and (max-width: 1024px) {
            grid-template-columns: 1fr;
        }
    }
</style>