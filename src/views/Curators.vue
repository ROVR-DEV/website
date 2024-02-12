<template>
    <section class="curators" v-if="!showCuratorInfo">
        <curator v-for="curator in sortedCurators" :key="curator.id" :curator="curator" @click="openCuratorInfo(curator)"/>
    </section>

    <curator-info v-else :curator="selectedCurator" @close="closeCuratorInfo"/>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import axios from 'axios';
    import Curator from '@/components/Curator.vue';
    import CuratorInfo from '@/components/CuratorInfo.vue';

    const curators = ref(null);
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

    onMounted(async () => {
        await axios.get('https://app.rovr.live/api/notifications/curators/all', {
            headers: {
                'Authorization': 'Bearer 1e10f824-8fb2-4951-9815-d84d7bb141f5',
            }
        }).then(e => {
            curators.value = e.data;
            console.log(curators.value);
        }).catch(() => {
            console.log('error getting curators');
        });
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
    }
</style>