<template>
    <div class="radio__timer" :class="{'radio__timer--active' : playerStore.isPlaying}">
        <span
            v-text="timer"
            @click="switchTimerMode"/>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';

    const playerStore = usePlayerStore();

    const mode = ref('until');

    const props = defineProps({
        since: {
            type: Number,
            required: true
        },
        until: {
            type: Number,
            required: true
        },
    });

    const timerSince = ref(props.since);
    const timerUntil = ref(props.until);
    const timeInterval = ref(null);

    onMounted(() => {
        updateTime();
    });

    watch(() => props.until, (newValue) => {
        timerUntil.value = newValue;
    });

    watch(timerUntil, (position) => {
        if (position === 0) {
            playerStore.setFinished(true);
            timerUntil.value = 0;
            timerSince.value = 0;
        }
    });

    const timer = computed(() => {
        if(mode.value === 'since') {
            return fmtMSS(Math.round(timerSince.value));
        } else {
            return `-${fmtMSS(Math.round(timerUntil.value))}`;
        }

    });

    const updateTime = () => {
        timeInterval.value = setInterval(() => {
            if (timerUntil.value > 0) {
                timerSince.value++;
                timerUntil.value--;
            }
        }, 1000);
    }

    const switchTimerMode = () => {
        mode.value === 'until' ? mode.value = 'since' : mode.value = 'until'
    }

    const fmtMSS = (s) => {
        const minutes = Math.floor(s / 60);
        s %= 60;
        return (minutes < 10 ? '0' : '') + minutes + ':' + (s < 10 ? '0' : '') + s;
    }
</script>

<style lang="scss" scoped>
    .radio__timer {
        margin-left: 4rem;
        span {
            @include font-size(88px);
            font-family: 'Roboto', monospace;
            font-weight: 300;
            display: block;
            font-weight: normal;
            line-height: 1;
            cursor: pointer;
            opacity: 0.32;
        }
        &--active {
            span {
                opacity: 1;
            }
        }
    }
</style>