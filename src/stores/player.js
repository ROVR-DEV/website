import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
    state: () => ({
        isPlayerReady: false,
        isPlaying: false,
        isFinished: false,
        stream_url: null,
    }),
    actions: {
        togglePlaying() {
            this.isPlaying = !this.isPlaying;
        },
        setReady() {
            this.isPlayerReady = true;
        },
        setFinished(status) {
            this.isFinished = status;
        },
        setStreamUrl(url) {
            this.stream_url = url;
        },
    },
});