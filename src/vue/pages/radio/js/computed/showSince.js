'use strict';

export default function showSince() {
	if (this.ivl === 0 && this.radio) {
        this.updateTimer()
    }
    return this.fmtMSS(Math.round(this.radio.show.since)) ?? '00:00'
}