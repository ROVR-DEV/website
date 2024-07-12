<template>
    <div ref="container" class="virtual-grid-container" @scroll="onScroll">
        <div :style="{ height: `${totalHeight}px` }"></div>
        <div v-for="item in visibleItems" :key="item.index" :style="item.style" class="virtual-grid-item">
            <slot :item="item.data"></slot>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const props = defineProps({
        items: {
            type: Array,
            required: true
        },
        itemHeight: {
            type: Number,
            required: true
        },
        buffer: {
            type: Number,
            default: 5
        }
    });

    const route = useRoute();
    const router = useRouter();
    const container = ref(null);
    const scrollTop = ref(0);
    const totalHeight = ref(0);
    const columns = ref(3); // Default to 3 columns
    const horizontalGap = ref(2);
    const verticalGap = ref(40);

    const visibleStartIndex = computed(() => Math.max(0, Math.floor(scrollTop.value / (props.itemHeight + verticalGap.value)) * columns.value - columns.value * props.buffer));

    const visibleEndIndex = computed(() => Math.min(props.items.length, Math.ceil((scrollTop.value + (container.value ? container.value.clientHeight : 0)) / (props.itemHeight + verticalGap.value)) * columns.value + columns.value * props.buffer));

    const calculateItemStyle = (index) => {
        const itemWidthPercentage = (100 - horizontalGap.value * (columns.value - 1)) / columns.value;
        const row = Math.floor(index / columns.value);
        const col = index % columns.value;

        return {
            position: 'absolute',
            top: `${row * (props.itemHeight + verticalGap.value)}px`,
            left: `${col * (itemWidthPercentage + horizontalGap.value)}%`,
            width: `${itemWidthPercentage}%`,
            height: `${props.itemHeight}px`,
        };
    };

    const visibleItems = computed(() =>
        props.items.slice(visibleStartIndex.value, visibleEndIndex.value).map((data, index) => ({
            data,
            index: visibleStartIndex.value + index,
            style: calculateItemStyle(visibleStartIndex.value + index)
        }))
    );

    const onScroll = () => {
        if (container.value) {
            scrollTop.value = container.value.scrollTop;
            localStorage.setItem('scrollPosition', scrollTop.value);
        }
    };

    const updateTotalHeight = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 480) {
            columns.value = 1;
        } else if (screenWidth < 1200) {
            columns.value = 2;
        } else {
            columns.value = 3;
        }

        const totalRows = Math.ceil(props.items.length / columns.value);
        totalHeight.value = totalRows * props.itemHeight + (totalRows - 1) * verticalGap.value;
    };

    const restoreScrollPosition = () => {
        const savedScrollPosition = localStorage.getItem('scrollPosition');
        if (savedScrollPosition && container.value) {
            container.value.scrollTop = Number(savedScrollPosition);
            scrollTop.value = Number(savedScrollPosition);
        }
    };

    onMounted(() => {
        if (container.value) {
            container.value.addEventListener('scroll', onScroll);
            window.addEventListener('resize', updateTotalHeight);
            updateTotalHeight();
            container.value.scrollTop = 50;
        }
        restoreScrollPosition();
    });

    onUnmounted(() => {
        if (container.value) {
            container.value.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', updateTotalHeight);
        }
    });

    watch(route, () => {
        if (router.currentRoute.value.name === 'archive') {
            restoreScrollPosition();
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
