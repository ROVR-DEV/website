'use strict';

export default function showCover() {
	return this.radio ? this.radio.show.cover.replace(/localhost|lp/gi, (matched) => this.replaceCover[matched]) : ''
}