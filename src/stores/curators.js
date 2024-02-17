import { defineStore } from "pinia";

export const useCuratorsStore = defineStore("curators", {
    state: () => ({
        curators: null,
    }),
    actions: {
        loadCurators(data) {
            this.curators = data;
        },
    },
});