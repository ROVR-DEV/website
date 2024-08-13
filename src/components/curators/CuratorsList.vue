<template>
    <div ref="container" class="virtual-grid-container" @scroll="onScroll">
        <div :style="{ height: `${totalHeight}px` }"></div>
        <div v-for="item in visibleItems" :key="item.index" :style="item.style" class="virtual-grid-item">
            <Curator :curator="item.data" @click="$router.push(`/curator/${slugify(item.data.name)}`)" />
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
    import { useCuratorsStore } from '@/stores/curators';
    import { slugify } from '@/utils/slugify';
    import { isMobile } from '@/utils/isMobile';
    import { setComputedSizes } from "@/helpers/setComputedSizes";
    import Curator from '@/components/curators/Curator.vue';

    const props = defineProps({
        items: {
            type: Array,
            required: true
        }
    });

    const curatorsStore = useCuratorsStore();
    const container = ref(null);
    const scrollTop = ref(0);
    const totalHeight = ref(0);
    const columns = ref(2);
    const horizontalGap = ref(0);
    const verticalGap = ref(0);
    const screenHeight = ref(window.innerHeight);
    const y = computed(() => screenHeight.value / 1080);
    const itemHeight = ref(180 * y.value);

    const visibleStartIndex = computed(() => Math.max(0, Math.floor(scrollTop.value / (itemHeight.value + verticalGap.value)) * columns.value - columns.value * 5));

    const visibleEndIndex = computed(() => Math.min(props.items.length, Math.ceil((scrollTop.value + (container.value ? container.value.clientHeight : 0)) / (itemHeight.value + verticalGap.value)) * columns.value + columns.value * 5));

    const calculateItemStyle = (index) => {
        const itemWidthPercentage = (100 - horizontalGap.value * (columns.value - 1)) / columns.value;
        const row = Math.floor(index / columns.value);
        const col = index % columns.value;

        return {
            position: 'absolute',
            top: `${row * (itemHeight.value + verticalGap.value)}px`,
            left: `${col * (itemWidthPercentage + horizontalGap.value)}%`,
            width: `${itemWidthPercentage}%`,
            height: `${itemHeight.value}px`,
        };
    }

    const visibleItems = computed(() =>
        props.items.slice(visibleStartIndex.value, visibleEndIndex.value).map((data, index) => ({
            data,
            index: visibleStartIndex.value + index,
            style: calculateItemStyle(visibleStartIndex.value + index)
        }))
    );

    const onScroll = async () => {
        if (container.value) {
            scrollTop.value = container.value.scrollTop;
            curatorsStore.scrollPosition = scrollTop.value;

            if (isMobile()) {
                await nextTick();
                setComputedSizes();
            }
        }
    }

    const updateTotalHeight = () => {
        const screenWidth = window.innerWidth;
        screenHeight.value = window.innerHeight;

        if (screenWidth < 1024 && screenWidth > 480) {
            columns.value = 1;
            itemHeight.value = 120 * y.value;
        } else if (screenWidth < 480) {
            columns.value = 1;
            itemHeight.value = 92;
        } else {
            columns.value = 2;
            itemHeight.value = 180 * y.value;
        }

        const totalRows = Math.ceil(props.items.length / columns.value);
        totalHeight.value = totalRows * itemHeight.value + (totalRows - 1) * verticalGap.value;
    }

    onMounted(() => {
        if (container.value) {
            container.value.addEventListener('scroll', onScroll);
            window.addEventListener('resize', updateTotalHeight);
            updateTotalHeight();
        } else {
            console.log('Container not initialized');
        }
    });

    onUnmounted(() => {
        if (container.value) {
            container.value.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', updateTotalHeight);
        }
    });

    watch(() => curatorsStore.curators, (newCurators) => {
        props.items = newCurators;
        updateTotalHeight();
    });

    watch(() => curatorsStore.isPopupShown, (status) => {
        if (!status) {
            container.value.scrollTop = curatorsStore.scrollPosition;
        }
    });
</script>

<style scoped>
    .virtual-grid-container {
        position: relative;
        overflow-y: auto;
        width: 100%;
        height: 100%;
    }

    .virtual-grid-item {
        position: absolute;
        box-sizing: border-box;
    }
</style>
