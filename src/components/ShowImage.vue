<template>
    <div class="show__image" :class="{ 'show__image--gradient' : isRadio }"
        @mousedown.prevent="isMobile ? null : startScaling()" 
        @mouseup.prevent="isMobile ? null : stopScaling()"
        @touchstart.prevent="isMobile ? startScaling() : null" 
        @touchend.prevent="isMobile ? stopScaling() : null">
        <img 
            :src="isRadio ? radioCover : path"
            :style="{ transform: photoScaleStyle }"
            oncontextmenu="return false;"
            alt="preview"
            fetchpriority="high">
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted } from "vue";
    import { useRadioStore } from "@/stores/radio";
    import { useRouter } from 'vue-router';
    import { slugify } from '@/utils/slugify';

    const radioStore = useRadioStore();
    const router = useRouter();
    const isMobile = ref(false);

    const props = defineProps({
        isRadio: {
            type: Boolean,
            required: false,
        },
        path: {
            type: String,
            required: false
        },
        curator: {
            type: String,
            required: true
        },
    });

    const checkIfMobile = () => {
        isMobile.value = window.innerWidth <= 1024;
    }

    onMounted(() => {
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', checkIfMobile);
    });

    
    const mainCurator = computed(() => {
        const curators = props.curator.split(' w/ ');
        return curators[0].trim();
    });

    const navigateToCurator = () => {
        router.push(`/curator/${slugify(mainCurator.value)}`);
    }

    // replacing radio cover (backend bug)
    const radioCover = computed(() => {
        const replaceCover = {
            localhost: 'app.rovr.live',
            lp: 'app'
        }

        if (radioStore.radio && radioStore.radio.show) {
            let cover;

            if (!isMobile.value) {
                cover = radioStore.radio.show.cover_desktop ?? radioStore.radio.show.cover;
            } else {
                cover = radioStore.radio.show.cover;
            }

            return cover.replace(/localhost|lp/gi, (matched) => replaceCover[matched]);
        } else {
            return "";
        }
    });

    // image scale
    const isScaling = ref(false);
    const photoScaleStyle = ref('scale(1)');

    const startScaling = () => {
        isScaling.value = true;
        setTimeout(() => {
            if (isScaling.value) {
                photoScaleStyle.value = 'scale(0.95)';
            }
        }, 500);
    }

    const stopScaling = () => {
        isScaling.value = false;
        photoScaleStyle.value = 'scale(0.98)';
        setTimeout(() => {
            photoScaleStyle.value = 'scale(1)';
            setTimeout(() => {
                navigateToCurator();
            }, 300);
        }, 100);
    }
</script>

<style lang="scss" scoped>
    .show__image {
        position: relative;
        cursor: pointer;
        overflow: hidden;
        flex: 0 1 45%;
        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
            position: relative;
            z-index: 1;
            transition: all 0.2s linear;
        }
        &--gradient::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 80%;
            background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.98) 76.04%);
            z-index: 2;
        }
    }
</style>