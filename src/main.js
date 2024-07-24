import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from "@vueuse/head"
import App from '@/App.vue'
import router from '@/router'
import { defaultMetaTags } from '@/defaultMeta.js';


import '@/assets/styles/main.scss'

const app = createApp(App)
const head = createHead()

defaultMetaTags.forEach(tag => head.addHeadObjs({ meta: [tag] }));

/*** <press effect> ***/
app.directive('press', {
  mounted(el, binding) {
    const { time, scale } = binding.value;

    el.addEventListener('click', () => {
      el.style.transition = `transform ${time}ms linear`;
      el.style.transform = `scale(${scale})`;

      setTimeout(() => {
        el.style.transition = '';
        el.style.transform = '';
      }, time);
    });
  }
});
/*** </press effect> ***/

app.use(head)
app.use(createPinia())
app.use(router)
app.mount('#app')