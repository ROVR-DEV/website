'use strict';

export default {
	name: 'Footer',
	props: {
		since: String,
		until: String,
		title: String,
		autor: String,
		isPlayingMob: Boolean
	},
	data() {
		return {
			sinceActive: false,
			isPlaying: false
		}
	}
}