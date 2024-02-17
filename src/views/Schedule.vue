<template>
    <section class="schedule" v-if="schedule" :class="{ 'nowplaying--hidden': currentDate !== selectedDate }">
        <div class="schedule__plan" ref="scrollParent">
            <week-days @day-picked="date => loadDaySchedule(date)"/>

            <div v-if="filteredSchedule.length > 0" class="schedule__programs">
                <schedule-program
                    v-for="program in filteredSchedule"
                    :key="program.id"
                    :program="program"
                    @show-curator-info="curator => showCuratorInfoHandler(curator)"/>
            </div>
        </div>
        <div class="schedule__current">
            <now-playing :program="schedule[0]" @show-curator-info="curator => showCuratorInfoHandler(curator)"/>
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

    watch(() => scheduleStore.schedule, (state) => {
        if (state) schedule.value = state;
    });

    const filteredSchedule = computed(() => {
        if (schedule.value && selectedDate.value) {
            return schedule.value.filter(program => program.start_time.includes(selectedDate.value) && !program.now_playing);
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
        display: flex;
        &__plan {
            flex: 0 1 40%;
            background-color: $primary;
            overflow-y: auto;
            overflow-x: hidden;
            position: relative;
            @media screen and (max-width: 1600px) {
                flex: 0 1 50%;
            }
        }
        &__programs {
            position: relative;
            z-index: 1;
            padding: 0 3.625rem 1.5rem 3.625rem;
            @media screen and (max-width: 1800px) {
                padding: 0 2rem 2rem 2rem;
            }
        }
        &__current {
            flex: 0 1 60%;
            display: flex;
            @media screen and (max-width: 1600px) {
                flex: 0 1 50%;
            }
        }
    }
</style>