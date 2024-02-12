<template>
    <div class="radio__timer">
        <span v-text="timer" @click="mode === 'until' ? mode = 'since' : mode = 'until'"/>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref, watch } from 'vue';

    const mode = ref('until');

    const emit = defineEmits(['finish']);

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
            emit('finish');
            timerUntil.value = 0;
            timerSince.value = props.since;
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

    const fmtMSS = (s) => {
        return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
    }
</script>

<style lang="scss" scoped>
    .radio__timer {
        margin-left: 4rem;
        span {
            @include font-size(92px);
            display: block;
            font-weight: normal;
            line-height: 1;
            cursor: pointer;
        }
    }
</style>