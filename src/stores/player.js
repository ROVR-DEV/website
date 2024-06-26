import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
    state: () => ({
        isPlaying: false,
        is_radio_finished: false,
        is_archive_finished: false,
        isLoading: false,
        source: null,
        fade_out: false,
        stream_url: null,
        soundcloud_secret: null,
        show_sticky_player: false,
        now_playing_archive: null,
        track: {
            title: null,
            artist: null,
            label: null,
            cover: null,
        }
    }),
    actions: {
        play(source) {
            if (this.source && this.source !== source) {
                this.stop();
            }
            this.source = source;
            this.isPlaying = true;
        },
        pause() {
            this.isPlaying = false;
        },
        stop() {
            this.isPlaying = false;
            this.source = null;
        },
        togglePlaying(source) {
            if (this.source === source && this.isPlaying) {
                this.pause();
            } else {
                this.play(source);
            }
        },
        setFinished(source, status) {
            if(source === 'radio') {
                this.is_radio_finished = status;
            } else if(source === 'archive') {
                this.is_archive_finished = status;
            }
            
        },
        setLoading(status) {
            this.isLoading = status;
        },
        setFadeOut(status) {
            this.fade_out = status;
        },
        setStreamUrl(url) {
            this.stream_url = url;
        },
        setSoundcloudSecret(url) {
            this.soundcloud_secret = url;
        },
        updateTrack(title, artist, label, cover) {
            this.track.title  = title;
            this.track.artist = artist;
            this.track.label  = label;
            if(cover) this.track.cover  = cover;
        },
        toggleStickyPlayer(status) {
            this.show_sticky_player = status;
        },
        setNowPlayingArchive(id) {
            this.now_playing_archive = id;
        }
    },
});