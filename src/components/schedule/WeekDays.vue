<template>
    <ul class="schedule__week">
        <li
            class="schedule__day"
            v-for="(day, index) in week"
            :key="index"
            :class="{ 'schedule__day--active': index === currentDayIndex }"
            @click="currentDayIndex = index; emit('day-picked', day);">
            <span class="schedule__day-name" v-text="day.name.slice(0, 3)"/>
            <div class="schedule__day-date" v-text="day.date"/>
        </li>

        <div class="schedule__loader" v-if="loading">
            <div class="ball-beat">
                <div></div><div></div><div></div>
            </div>
        </div>
    </ul>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { usePlayerStore } from '@/stores/player';
    import 'loaders.css';

    const emit = defineEmits(['day-picked']);
    const playerStore = usePlayerStore();
    const week = ref([]);
    const currentDayIndex = ref(-1);

    defineProps({
        loading: {
            type: Boolean,
            required: true
        }
    });

    onMounted(() => {
        getWeek();
    });

    watch(() => playerStore.isFinished, (state) => {
        if (state) getWeek();
    });

    const getWeek = () => {
        const currentDate = new Date();
        const daysOfWeek = [];

        for (let i = 0; i < 7; i++) {
            const nextDate = new Date();
            nextDate.setDate(currentDate.getDate() + i);

            const day = {
                date: nextDate.getDate(),
                name: getShortDayName(nextDate),
                fullDate: nextDate.toLocaleDateString('en-GB')
            };

            daysOfWeek.push(day);

            if (nextDate.getDate() === currentDate.getDate()) {
                currentDayIndex.value = i;
            }
        }

        week.value = daysOfWeek;

        emit('day-picked', daysOfWeek[currentDayIndex.value]);
    }

    const getShortDayName = (date) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[date.getDay()];
    }
</script>

<style lang="scss" scoped>
    .schedule__week {
        @include flex-center-sb;
        background-color: $primary;
        padding: 1.5rem 3.5rem;
        grid-row: 1/2;
        position: relative;
        .schedule__day {
            text-align: center;
            cursor: pointer;
            &-name {
                @include font-size(18px);
                display: block;
                font-weight: bold;
                color: $black;
                text-transform: uppercase;
                margin-bottom: 0.75rem;
            }
            &-date {
                @include flex-center;
                @include font-size(24px);
                width: 3.5rem;
                aspect-ratio: 1;
                border-radius: 50%;
                background-color: $black;
                border: 2px solid $black;
                color: $primary;
                font-weight: bold;
                line-height: 20px;
                transition: $transition;
            }
            &--active {
                .schedule__day-date {
                    color: $black;
                    background-color: transparent;
                }
            }
        }
    }
    .schedule__loader {
        @include flex-center;
        width: 100%;
        position: absolute;
        bottom: -0.325rem;
        left: 0;
        z-index: 3;
        .ball-beat > div {
            background-color: $black;
            width: 0.75rem;
            height: 0.75rem;
        }
    }
</style>