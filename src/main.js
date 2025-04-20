import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./assets/styles/main.css";
import { createPinia } from 'pinia'
import { VueFinalModal, ModalsContainer } from 'vue-final-modal'

const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
app.use(router);
app.component('VueFinalModal', VueFinalModal);
app.component('ModalsContainer', ModalsContainer);

app.mount("#app");

