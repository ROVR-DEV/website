'use strict';

export default function showUntil() {
	if (this.ivl === 0 && this.radio) {
        this.updateTimer();
    }
    return this.fmtMSS(Math.round(this.radio.show.until)) ?? '00:00'
}