import { defineStore } from "pinia";

export const useProgramStore = defineStore("program", {
    state: () => ({
        program: null,
    }),
    actions: {
        setProgram(data) {
            this.program = data;
        },
    },
});