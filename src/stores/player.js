import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
    state: () => ({
        isPlayerReady: false,
        isPlaying: false,
        isFinished: false,
        stream_url: null,
        show_sticky_player: false,
        track: {
            title: null,
            artist: null,
            label: null,
        }
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
        updateTrack(title, artist, label) {
            this.track.title  = title;
            this.track.artist = artist;
            this.track.label  = label;
        },
        toggleStickyPlayer(status) {
            this.show_sticky_player = status;
        }
    },
});