<template>
    <section class="schedule" v-if="schedule" :class="{ 'nowplaying--hidden': (selectedDate && currentDate !== selectedDate.fullDate) }">
        <div class="schedule__plan" ref="scrollParent">
            <week-days @day-picked="date => loadDaySchedule(date)" :loading="preloader"/>

            <div v-if="filteredSchedule.length > 0" class="schedule__programs">
                <schedule-program
                    v-for="program in filteredSchedule"
                    :key="program.id"
                    :program="program"
                    @show-curator-info="curator => showCuratorInfoHandler(curator)"/>
            </div>

            <div
                v-else-if="(selectedDate && !filteredSchedule.length > 0)"
                class="schedule__empty"
                v-text="`That's it for ${selectedDate.name}!`"/>

            <div class="schedule__current">
                <now-playing :program="schedule[0]" @show-curator-info="curator => showCuratorInfoHandler(curator)"/>
            </div>
        </div>
    </section>

    <curator-info v-if="showCuratorInfo" :curator="selectedCurator" @close="showCuratorInfo = false"/>
</template>

<script setup>
    import { ref, computed, watch } from 'vue';
    import { useScheduleStore } from '@/stores/schedule';
    import WeekDays from '@/components/schedule/WeekDays.vue';
    import ScheduleProgram from '@/components/schedule/ScheduleProgram.vue';
    import NowPlaying from '@/components/schedule/NowPlaying.vue';
    import CuratorInfo from '@/components/CuratorInfo.vue';

    const scheduleStore = useScheduleStore();
    const schedule = ref(scheduleStore.schedule);
    const selectedDate = ref(null);
    const showCuratorInfo = ref(false);
    const selectedCurator = ref(null);
    const scrollParent = ref(null);
    const preloader = ref(false);

    watch(() => scheduleStore.schedule, (state) => {
        if(state) {
            schedule.value = state;
            preloader.value = false;
        } else {
            preloader.value = true;
        }
    });

    const filteredSchedule = computed(() => {
        if (schedule.value && selectedDate.value) {
            return schedule.value.filter(program => program.start_time.includes(selectedDate.value.fullDate) && !program.now_playing);
        } else {
            return [];
        }
    });

    const loadDaySchedule = (date) => {
        selectedDate.value = date;
        scrollParent.value.scrollTop = 0;
    }

    const showCuratorInfoHandler = (curator) => {
        showCuratorInfo.value = true;
        selectedCurator.value = curator;
        console.log(curator);
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
</style>