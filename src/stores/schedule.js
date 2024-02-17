import { defineStore } from "pinia";

export const useScheduleStore = defineStore("schedule", {
    state: () => ({
        schedule: null,
    }),
    actions: {
        loadSchedule(data) {
            this.schedule = data;
        },
    },
});