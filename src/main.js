import './assets/main.css'
import 'primeicons/primeicons.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config";
import Aura from '@primeuix/themes/aura';
import Button from "primevue/button";
import Divider from "primevue/divider";
import Dialog from "primevue/dialog";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import FloatLabel from "primevue/floatlabel";
import ToastService from 'primevue/toastservice';


const app = createApp(App)


app.use(router)
app.use(ToastService);
app.use(PrimeVue, {
	theme: {
		preset: Aura,
	}
});


app.component("Button", Button);
app.component("Divider", Divider);
app.component("Dialog", Dialog);
app.component("InputGroup", InputGroup);
app.component("InputGroupAddon", InputGroupAddon);
app.component("InputText", InputText);
app.component("Textarea", Textarea);
app.component("FloatLabel", FloatLabel);


app.mount('#app')
