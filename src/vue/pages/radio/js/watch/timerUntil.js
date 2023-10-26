'use strict';

import jingle  from '../../jingle.mp3'

export default function timerUntil(oldVal, newVal) {
	if(newVal && newVal == 3) {
		if(this.isPlaying) {
			let player = this.$refs.player;
			let actualVolumeFadeOut = player.volume;

			let fadeOutInterval = setInterval(function() {
		        actualVolumeFadeOut = (parseFloat(actualVolumeFadeOut) - 0.1).toFixed(1);
		        if (actualVolumeFadeOut >= 0) {
		          player.volume = actualVolumeFadeOut;
		        } else {
		          clearInterval(fadeOutInterval);
		        }
		     }, 200);

			setTimeout(() => {
				player.pause();
				player.setAttribute('src', jingle);
			}, 2000);

			setTimeout(() => {
				player.play();
				player.volume = 1;

				player.addEventListener('ended', () => {
					player.setAttribute('src', this.radio.stream_url);
					player.play();
				});
			}, 3000);
		}
	}
}