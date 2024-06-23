<template>
    <div class="marquee-container">
        <p v-if="isVisible" class="marquee-text" :class="marqueeClass ?? ''" ref="marqueeText"
            :style="{ transform: transformStyle, transitionDuration: transitionDuration }">
            <slot></slot>
            {{ text }}
        </p>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const transformStyle = ref('translateX(0)');
const transitionDuration = ref('0s');
const marqueeText = ref(null);
const isVisible = ref(true);

let animation = null;

const props = defineProps({
    marqueeClass: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: false
    }
});

const resetAnimation = () => {
    if (animation) {
        clearInterval(animation);
        animation = null;
    }
    transformStyle.value = 'translateX(0)';
    transitionDuration.value = '0s';
    isVisible.value = false;
    setTimeout(() => {
        isVisible.value = true;
    }, 10);
};

const startAnimation = () => {
    if (marqueeText.value) {
        const marqueeContent = marqueeText.value;
        const containerWidth = marqueeContent.parentNode.clientWidth;
        const textWidth = marqueeContent.clientWidth;

        if (textWidth > containerWidth) {
            let speed = textWidth / 40;
            transitionDuration.value = speed + 's';
            setTimeout(marqueeAnimation, 1000);
            animation = setInterval(marqueeAnimation, Math.round(speed) * 1000 + 1500);
        } else {
            resetAnimation();
        }
    } else {
        resetAnimation();
    }
};

const marqueeAnimation = () => {
    if (marqueeText.value) {
        const marqueeContent = marqueeText.value;
        const textWidth = marqueeContent.clientWidth;
        const containerWidth = marqueeContent.parentNode.clientWidth;

        if (transformStyle.value === 'translateX(0)') {
            transformStyle.value = `translateX(-${textWidth - containerWidth}px)`;
        } else {
            transformStyle.value = 'translateX(0)';
        }
    }
};

onMounted(() => {
    setTimeout(() => {
        resetAnimation();
        startAnimation();
    }, 300);
});

watch(() => props.text, (text) => {
    if (text) {
        resetAnimation();
        setTimeout(() => {
            startAnimation();
        }, 1000);
    }
});
</script>

<style lang="scss" scoped>
    .marquee-container {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        line-height: 1;

        .marquee-text {
            display: inline-block;
            transition-timing-function: linear;
        }
    }
</style>