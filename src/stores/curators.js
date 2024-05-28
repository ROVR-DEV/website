import { defineStore } from "pinia";

export const useCuratorsStore = defineStore("curators", {
    state: () => ({
        curators: null,
        isPopupShown: false,
        scrollPosition: null,
    }),
    actions: {
        loadCurators(data) {
            this.curators = data;
        },
        popupShowing(status) {
            this.isPopupShown = status;
        },
        setScrollPosition(position) {
            this.scrollPosition = position;
        }
    },
});