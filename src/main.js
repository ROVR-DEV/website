import { createApp } from 'vue'
import App from './app/App.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

createApp(App).use(AOS.init()).mount('#app')
