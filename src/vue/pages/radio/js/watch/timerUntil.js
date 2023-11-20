'use strict';

import $ from 'jquery';

export default function timerUntil(oldVal, newVal) {
	if(newVal && newVal == 3) {
		if(this.isPlaying) {
			let player = this.player;
			let jingle = this.jingle;

			$(player).animate({volume: 0}, 2500);

			setTimeout(() => {
				player.pause();
				jingle.play();
				$(jingle).animate({volume: 1}, 1500);
				

				jingle.addEventListener('ended', () => {
					player.currentTime = this.playerTime;
					player.play();
					$(player).animate({volume: 1}, 2000);
				});
			}, 3000);
		}
	}
}