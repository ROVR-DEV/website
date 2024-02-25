<template>
    <div class="marquee-container">
        <p
            class="marquee-text"
            :class="marqueeClass ?? ''"
            ref="marqueeText"
            :style="{ transform: transformStyle, transitionDuration: transitionDuration}">
            <slot></slot>
        </p>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const transformStyle = ref('translateX(0)');
    const transitionDuration = ref(0);
    const marqueeText = ref(null);

    let animation = null;

    onMounted(() => {
        checkForAnimation();
    });

    defineProps({
        marqueeClass: {
            type: String,
            required: false
        }
    });

    const checkForAnimation = () => {
        if(marqueeText.value) {
            const marqueeContent = marqueeText.value;
            const containerWidth = marqueeContent.parentNode.clientWidth;
            const textWidth = marqueeContent.clientWidth;

            if (textWidth > containerWidth) {
                let speed = textWidth / 40;
                transitionDuration.value = speed + 's';
                setTimeout(marqueeAnimation, 1000);
                animation = setInterval(marqueeAnimation, Math.round(speed) * 1000 + 1500);
            } else {
                clearInterval(animation);
            }
        } else {
            clearInterval(animation);
        }
    }

    const marqueeAnimation = () => {
        if(marqueeText.value) {
            const marqueeContent = marqueeText.value;
            const textWidth = marqueeContent.clientWidth;
            const containerWidth = marqueeContent.parentNode.clientWidth;

            if (transformStyle.value === 'translateX(0)') {
                transformStyle.value = `translateX(-${textWidth - containerWidth}px)`;
            } else {
                transformStyle.value = 'translateX(0)';
            }
        }
    }
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