'use strict';

export default function timerUntil(oldVal, newVal) {
	if(newVal && newVal == 3) {
		if(this.isPlaying) {
			let player = this.player;
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
			}, 2000);

			setTimeout(() => {
				this.jingle.play();
				player.volume = 1;
				this.jingle.volume = 1;

				this.jingle.addEventListener('ended', () => {
					player.currentTime = this.playerTime;
					player.play();
				});
			}, 3000);
		}
	}
}