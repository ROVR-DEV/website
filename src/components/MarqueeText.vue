<template>
    <div class="marquee-container">
        <p v-if="isMarqueeShown" class="marquee-text" :class="marqueeClass ?? ''" ref="marqueeText"
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
    const isMarqueeShown = ref(false);

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
        transformStyle.value = 'translateX(0)';
        transitionDuration.value = '0s';
        clearInterval(animation);
    }

    const startAnimation = () => {
        const marqueeContent = marqueeText.value;
        const containerWidth = marqueeContent.parentNode.clientWidth;
        const textWidth = marqueeContent.clientWidth;

        if (textWidth > containerWidth) {
            const speed = textWidth / 100;
            transitionDuration.value = `${speed}s`;
            setTimeout(marqueeAnimation, 1000);
            animation = setInterval(marqueeAnimation, Math.round(speed) * 1000 + 1500);
        }
    }

    const checkForAnimation = () => {
        if (marqueeText.value) {
            startAnimation();
        } else {
            clearInterval(animation);
        }
    }

    const marqueeAnimation = () => {
        if (marqueeText.value) {
            const marqueeContent = marqueeText.value;
            const textWidth = marqueeContent.clientWidth;
            const containerWidth = marqueeContent.parentNode.clientWidth;

            transformStyle.value = transformStyle.value === 'translateX(0)' ? `translateX(-${textWidth - containerWidth}px)` : 'translateX(0)';
        }
    }

    onMounted(() => {
        isMarqueeShown.value = true;
        setTimeout(() => {
            resetAnimation();
            checkForAnimation();
        }, 100);
    });

    watch(() => props.text, () => {
        isMarqueeShown.value = false;
        setTimeout(() => {
            isMarqueeShown.value = true;
            resetAnimation();
            setTimeout(checkForAnimation, 100);
        }, 25);
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
