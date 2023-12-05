'use strict';

import io      from 'socket.io-client';
import Echo    from 'laravel-echo';
import axios   from 'axios';
import AOS     from 'aos';
import jingle  from '../media/jingle.mp3';

export default function mounted() {
	// Animate On Scroll library initialization
	AOS.init({
		disable: 'mobile',
		duration: 1000,
		delay: 1000
	});

	// Detecting time zone in GMT format
	let gmt=window.Date ().match (/GMT[+-]\d{2}/)[0];

	// getting current show
	axios.get('https://app.rovr.live/api/all/now/playing', {
		headers: {
			'X-TIMEZONE' : gmt,
	    	'Authorization' : 'Bearer 67e0d139-5d59-428b-834d-286bbe462980',
		}
	}).then(e => {
		this.radio  = e.data.live;
		this.player = new Audio(this.radio.stream_url);
		this.jingle = new Audio(jingle);

		this.interval = setInterval(() => {
			this.playerTime++;
		}, 1000);
	}).catch(() => console.log('axios error'));

	// connecting socket-io
	window.io=io;
	window.Echo=new Echo (
	  {
	    broadcaster:'socket.io',
	    namespace:'App.Events',
	    host:'https://app.rovr.live/',
	    auth:{'headers':{'Authorization':'Bearer '+ '4b5febd4-921d-4bd4-ba67-3fc0d03d3903'}}
	  });

	// listening for socket and updating info
	window.Echo.private ('playnow.'+gmt).listen ('.playnow', e => {
		this.radio = e.playnow.live;
		this.updateTimer();
		console.log(this.radio);
	});
}