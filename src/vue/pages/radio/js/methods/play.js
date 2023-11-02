'use strict';

export default function play(event) {
	let player = this.player;
	let btn    = event.target;
	
	if(btn.classList.contains('play')) {
		this.isPlaying = true;
		this.playPressCount++;

		console.log(this.playPressCount);

		if(this.playPressCount === 1) {
			this.jingle.volume = 0;
			this.jingle.play();
			setTimeout(() => {
				this.jingle.pause();	
			}, 100);
		}

		player.currentTime = this.playerTime;
		player.play();

		btn.classList.remove('play');
		btn.classList.add('stop');

		this.$refs.radio.classList.remove('hide-cover');
		this.$refs.radio.classList.add('show-cover');

		setTimeout(() => {
			this.$refs.radio.classList.add('visible');
		}, 400);

		this.$refs.qrBtn.classList.add('active');
		this.$refs.getApp.classList.add('active');
		
		this.$refs.footerComponent.$refs.footer.classList.add('active');
	} else {
		this.isPlaying = false;

		player.pause();

		btn.classList.remove('stop');
		btn.classList.add('play');

		this.$refs.radio.classList.remove('show-cover');
		this.$refs.radio.classList.add('hide-cover');

		setTimeout(() => {
			this.$refs.radio.classList.remove('visible');
		}, 400);

		this.$refs.qrBtn.classList.remove('active');
		this.$refs.getApp.classList.remove('active');
		
		this.$refs.footerComponent.$refs.footer.classList.remove('active');
	}
}