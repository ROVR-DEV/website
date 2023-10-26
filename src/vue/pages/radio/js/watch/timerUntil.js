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
		     }, 250);

			setTimeout(() => {
				player.pause();
				player.setAttribute('src', jingle);
			}, 3000);

			setTimeout(() => {
				player.play();
				player.volume = 1;

				this.$refs.radio.classList.remove('show-cover');
				this.$refs.radio.classList.add('hide-cover');

				setTimeout(() => {
					this.$refs.radio.classList.remove('visible');
				}, 400);

				setTimeout(() => {
					this.$refs.radio.classList.remove('hide-cover');
					this.$refs.radio.classList.add('show-cover');
				}, 2000);

				setTimeout(() => {
					this.$refs.radio.classList.add('visible');
				}, 2400);

				player.addEventListener('ended', () => {
					player.setAttribute('src', this.radio.stream_url);
					player.play();
				});
			}, 4000);
		}
	}
}