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

const custom_preset = definePreset(Aura, {
	semantic,
});

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
	theme: {
		preset: custom_preset,
		options: {
			darkModeSelector: ".dark-mode"
		}
	}
});

app.component("Button", Button);

app.mount('#app')
