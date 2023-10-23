'use strict';

import Header  from '../../components/header/Header.vue'
import Footer  from '../../components/footer/Footer.vue'
import QRPopup from '../../components/QRPopup/QRPopup.vue'
import data       from './js/data';
import computed   from './js/computed';
import methods    from './js/methods';
import mounted    from './js/mounted';
import watch      from './js/watch';

export default {
	name: 'Radio',
	components: {
		Header,
		Footer,
		QRPopup
	},
	data,
	computed,
	methods,
	mounted,
	watch
}