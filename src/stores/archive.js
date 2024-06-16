import { defineStore } from "pinia";

export const useArchiveStore = defineStore("archive", {
    state: () => ({
        archive: null,
    }),
    actions: {
        loadArchive(data) {
            this.archive = data;
        },
    },
});