<template>
    <div class="radio__timer" :class="{'radio__timer--active' : playerStore.isPlaying && playerStore.source === 'radio' && !playerStore.isLoading}">
        <span
            v-text="timer"
            @click="switchTimerMode"/>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';
    import { useRadioStore }  from '@/stores/radio';
    import { formatTimer } from '@/utils/formatTimer';

    const playerStore = usePlayerStore();
    const radioStore  = useRadioStore();

    const mode = ref('until');

    const timerSince = ref(Math.round(radioStore.radio.show.since));
    const timerUntil = ref(Math.round(radioStore.radio.show.until));
    const timeInterval = ref(null);

    onMounted(() => updateTime());

    watch(() => radioStore.radio.show.until, (newValue) => {
        timerUntil.value = Math.round(newValue);
    });

    watch(() => radioStore.radio.show.since, (newValue) => {
        timerSince.value = Math.round(newValue);
    });

    watch(timerUntil, (position) => {
        if (position === 5) {
            playerStore.setFadeOut(true);
        }
    });

    const timer = computed(() => {
        if(mode.value === 'since') {
            return formatTimer(Math.round(timerSince.value));
        } else {
            return `-${formatTimer(Math.round(timerUntil.value))}`;
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