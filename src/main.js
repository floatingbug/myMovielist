import './assets/main.css'
import 'primeicons/primeicons.css'

import {createApp} from 'vue';
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Button from "primevue/button";
import {definePreset} from "@primevue/themes";
import semantic from "./theme/semantic.js";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Divider from 'primevue/divider';
import Rating from "primevue/rating";


const custom_preset = definePreset(Aura, {
	semantic,
});

const app = createApp(App)

app.use(router);
app.use(ToastService);
app.use(PrimeVue, {
	theme: {
		preset: custom_preset,
		options: {
			darkModeSelector: ".dark-mode"
		}
	}
});

app.component("Button", Button);
app.component("Toast", Toast);
app.component("Divider", Divider);
app.component("Rating", Rating);

app.mount('#app')
