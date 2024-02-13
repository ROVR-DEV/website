<template>
    <ul class="schedule__week">
        <li
            class="schedule__day"
            v-for="(day, index) in week"
            :key="index"
            :class="{ 'schedule__day--active': index === currentDayIndex }"
            @click="currentDayIndex = index; emit('day-picked', day.fullDate);">
            <span class="schedule__day-name" v-text="day.name"/>
            <div class="schedule__day-date" v-text="day.date"/>
        </li>
    </ul>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const emit = defineEmits(['day-picked']);

    const week = ref([]);
    const currentDayIndex = ref(-1);

    onMounted(() => {
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

        emit('day-picked', daysOfWeek[currentDayIndex.value].fullDate);
    });

    const getShortDayName = (date) => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return daysOfWeek[date.getDay()];
    }
</script>

<style lang="scss" scoped>
    .schedule__week {
        @include flex-center-sb;
        margin-bottom: 3.5rem;
        position: sticky;
        top: 0;
        left: 0;
        background-color: $primary;
        padding: 1.5rem 3.625rem;
        z-index: 2;
        @media screen and (max-width: 1800px) {
            padding: 2rem;
            margin-bottom: 1rem;
        }
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
                //font-family: 'Azeret Mono', monospace;
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
</style>