'use strict';

import io      from 'socket.io-client'
import Echo    from 'laravel-echo'
import axios   from 'axios'

export default function mounted() {
	// Detecting time zone in GMT format
	let gmt=window.Date ().match (/GMT[+-]\d{2}/)[0];

	axios.get('https://app.rovr.live/api/all/now/playing', {
		headers: {
			'X-TIMEZONE' : gmt,
	    	'Authorization' : 'Bearer 4b5febd4-921d-4bd4-ba67-3fc0d03d3903',
		}
	}).then(e => {
		this.radio = e.data.live;
		console.log(this.radio);
	}).catch(() => console.log('axios error'));

	window.io=io;
	window.Echo=new Echo (
	  {
	    broadcaster:'socket.io',
	    namespace:'App.Events',
	    host:'https://app.rovr.live/',
	    auth:{'headers':{'Authorization':'Bearer '+ '4b5febd4-921d-4bd4-ba67-3fc0d03d3903'}}
	  });

	window.Echo.private ('playnow.'+gmt).listen ('.playnow', e => {
		this.radio = e.playnow.live;
		this.updateTimer();
		console.log(this.radio);
	});

	console.log('vue');
}