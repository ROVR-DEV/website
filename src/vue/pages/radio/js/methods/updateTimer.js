'use strict';

export default function updateTimer() {
	clearInterval(this.ivl);
	this.ivl = setInterval(()=>{
		if(Math.round(this.radio.show.until) > 0) {
			this.radio.show.since = Math.round(this.radio.show.since) + 1
	    	this.radio.show.until = Math.round(this.radio.show.until) - 1
	    	this.timerUntil       = this.radio.show.until
		}
	    
	    console.log(this.timerUntil);
	}, 1000);
}