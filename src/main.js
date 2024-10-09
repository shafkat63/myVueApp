// For Vue 3
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css'
import Toast from "vue-toastification";


createApp(App).use(router).use(Toast).mount('#app');