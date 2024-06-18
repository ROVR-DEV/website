<template>
    <div ref="container" class="virtual-grid-container" @scroll="onScroll">
        <div :style="{ height: `${totalHeight}px` }"></div>
        <div v-for="item in visibleItems" :key="item.index" :style="item.style" class="virtual-grid-item">
            <slot :item="item.data"></slot>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted } from 'vue';

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

    const container = ref(null);
    const scrollTop = ref(0);
    const totalHeight = ref(0);
    const columns = ref(2);
    const horizontalGap = ref(4);
    const verticalGap = ref(40);

    const visibleStartIndex = computed(() =>
        Math.max(0, Math.floor(scrollTop.value / props.itemHeight) * columns.value - columns.value * props.buffer)
    );

    const visibleEndIndex = computed(() =>
        Math.min(props.items.length, Math.ceil((scrollTop.value + (container.value ? container.value.clientHeight : 0)) / props.itemHeight) * columns.value + columns.value * props.buffer)
    );

    const calculateItemStyle = (index) => {
        const itemWidthPercentage = (100 - horizontalGap.value * (columns.value - 1)) / columns.value; // учитываем горизонтальный отступ
        const topPosition = Math.floor(index / columns.value) * (props.itemHeight + verticalGap.value); // учитываем вертикальный отступ
        const leftPosition = (index % columns.value) * (itemWidthPercentage + horizontalGap.value); // учитываем горизонтальный отступ

        return {
            position: 'absolute',
            top: `${topPosition}px`,
            left: `${leftPosition}%`,
            width: `${itemWidthPercentage}%`,
            height: `${props.itemHeight}px`,
        };
    }

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
        }
    };

    const updateTotalHeight = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 480) {
            columns.value = 1;
            horizontalGap.value = 0;
        } else {
            columns.value = 2;
        }
        totalHeight.value = Math.ceil(props.items.length / columns.value) * props.itemHeight;
    }

    onMounted(() => {
        if (container.value) {
            scrollTop.value = container.value.scrollTop;
        }
        updateTotalHeight();

        window.addEventListener('resize', () => {
            updateTotalHeight();
        });
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateTotalHeight());
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
