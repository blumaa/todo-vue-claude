import { createApp } from 'vue';
import { createPinia } from 'pinia';

import '@unocss/reset/tailwind.css';
import 'uno.css';
import 'virtual:uno.css';
import App from './App.vue';
import router from '@/routes/index';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
