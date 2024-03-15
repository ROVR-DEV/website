import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
    state: () => ({
        isPlaying: false,
        isFinished: false,
        isLoading: false,
        stream_url: null,
        show_sticky_player: false,
        track: {
            title: null,
            artist: null,
            label: null,
            cover: null,
        }
    }),
    actions: {
        togglePlaying() {
            this.isPlaying = !this.isPlaying;
        },
        setFinished(status) {
            this.isFinished = status;
        },
        setLoading(status) {
            this.isLoading = status;
        },
        setStreamUrl(url) {
            this.stream_url = url;
        },
        updateTrack(title, artist, label, cover) {
            this.track.title  = title;
            this.track.artist = artist;
            this.track.label  = label;
            this.track.cover  = cover;
        },
        toggleStickyPlayer(status) {
            this.show_sticky_player = status;
        }
    },
});