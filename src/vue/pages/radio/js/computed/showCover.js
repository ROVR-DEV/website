'use strict';

export default function showCover() {
	if(this.radio) {
		if(screen.width >= 770) {
			return this.radio.show.cover_desktop ? this.radio.show.cover_desktop.replace(/localhost|lp/gi, (matched) => this.replaceCover[matched]) : this.radio.show.cover.replace(/localhost|lp/gi, (matched) => this.replaceCover[matched])
		} else {
			return this.radio.show.cover_mobile ? this.radio.show.cover_mobile.replace(/localhost|lp/gi, (matched) => this.replaceCover[matched]) : this.radio.show.cover.replace(/localhost|lp/gi, (matched) => this.replaceCover[matched])
		}
	} else {
		return 'https://coolbackgrounds.io/images/backgrounds/black/black-contour-f41038db.svg'
	}
}