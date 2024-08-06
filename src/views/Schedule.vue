<template>
    <section class="schedule" v-if="schedule && !preloader" :class="{ 'nowplaying--hidden': (selectedDate && currentDate !== selectedDate.fullDate) }">
        <div class="schedule__plan" ref="scrollParent">
            <week-days @day-picked="date => loadDaySchedule(date)" :loading="preloader"/>

            <div v-if="filteredSchedule.length > 0" class="schedule__programs">
                <schedule-program
                    v-for="program in filteredSchedule"
                    :key="program.id"
                    :program="program"/>
            </div>

            <div
                v-else-if="(selectedDate && !filteredSchedule.length > 0)"
                class="schedule__empty"
                v-text="`That's it for ${selectedDate.name}!`"/>

            <div class="schedule__current">
                <now-playing :program="schedule[0]"/>
            </div>
        </div>
    </section>

    <div class="schedule-preloader" v-else>
        <div class="ball-beat">
            <div></div><div></div><div></div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, watch, nextTick } from 'vue';
    import { useScheduleStore } from '@/stores/schedule';
    import { isMobile } from '@/utils/isMobile';
    import { setComputedSizes } from '@/helpers/setComputedSizes';
    import WeekDays from '@/components/schedule/WeekDays.vue';
    import ScheduleProgram from '@/components/schedule/ScheduleProgram.vue';
    import NowPlaying from '@/components/schedule/NowPlaying.vue';
    import 'loaders.css';

    const scheduleStore = useScheduleStore();
    const schedule = ref(scheduleStore.schedule);
    const selectedDate = ref(null);
    const scrollParent = ref(null);
    const preloader = ref(false);

    watch(() => scheduleStore.schedule, (state) => {
        if(state) {
            schedule.value = state;
            preloader.value = false;
        } else {
            preloader.value = true;
        }
    }, { immediate: true });

    const filteredSchedule = computed(() => {
        if (schedule.value && selectedDate.value) {
            return schedule.value.filter((program, index) => program.start_time.includes(selectedDate.value.fullDate) && index !== 0);
        } else {
            return [];
        }
    });

    watch(() => selectedDate.value, async (state) => {
        if (state) {
            if ( isMobile() ) {
                await nextTick();
                setComputedSizes();
            }
        }
    }, { immediate: true });

    const loadDaySchedule = async (date) => {
        selectedDate.value = date;
        scrollParent.value.scrollTop = 0;
    }

    const currentDate = computed(() => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    });
</script>

<style lang="scss" scoped>
    .schedule {
        &__plan {
            display: grid;
            grid-template-columns: 45% 55%;
            background-color: $primary;
            overflow: hidden;
            position: relative;
            grid-template-rows: 8.75rem auto;
            grid-row-gap: 0.5rem;
            height: 100%;
        }
        &__programs {
            grid-row: 2/3;
            position: relative;
            z-index: 1;
            padding: 0 3.5rem 1.5rem 3.5rem;
            overflow-y: auto;
            &::-webkit-scrollbar-thumb {
                box-shadow: 0 0 10px rgba($color: $black, $alpha: 0.5);
            }
        }
        &__empty {
            @include flex-center;
            @include font-size(24px);
            flex: auto;
            font-weight: bold;
            font-style: italic;
        }
        &__current {
            display: flex;
            grid-column: 2/3;
            grid-row: 1/3;
        }
    }

    .schedule-preloader {
        @include flex-center-column;
        height: 100%;
        .ball-beat > div {
            background-color: $primary;
        }
    }
</style>