import { defineStore } from "pinia";

export const useArchiveStore = defineStore("archive", {
    state: () => ({
        archive: null,
        isPlaying: false,
    }),
    actions: {
        loadArchive(data) {
            this.archive = data;
        },
        togglePlaying() {
            this.isPlaying = !this.isPlaying;
        }
    },
});