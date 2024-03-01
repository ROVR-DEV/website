import { defineStore } from "pinia";

export const useRadioStore = defineStore("radio", {
    state: () => ({
        radio: null,
    }),
    actions: {
        loadData(data) {
            this.radio = data;
        },
    },
});