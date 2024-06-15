import { defineStore } from "pinia";

export const useArchiveStore = defineStore("archive", {
    state: () => ({
        archive: null,
        now_playing_id: null,
    }),
    actions: {
        loadArchive(data) {
            this.archive = data;
        },
        setNowPlayingId(id) {
            this.now_playing_id = id;
        }
    },
});