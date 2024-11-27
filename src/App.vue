<script setup>
import {ref, onMounted} from "vue";
import { RouterLink, RouterView } from 'vue-router'
import useDeviceSize from "./composables/useDeviceSize.js";
import TheNavbar from "./components/Navbar/TheNavbar.vue";
import TheFooter from "@/components/footer/TheFooter.vue";
import {useUser} from "./store/useUser.js";
import {useFetch} from "./composables/useFetch.js";


const {device} = useDeviceSize();
const {setUserSettings, getUserSettings, setUser, getUser} = useUser();
const userSettings = getUserSettings();
const user = getUser();
const isInitialized = ref(false);


onMounted(async () => {
	const token = localStorage.getItem("token");
	const isSignedIn = localStorage.getItem("isSignedIn");
	
	//handle sign in
	if(isSignedIn === true || isSignedIn === "true") setUserSettings({isSignedIn: true});

	//handle device
	if(window.innerWidth >= 1000) device.value = "ld";
	else device.value = "sd";

	window.addEventListener("resize", (e) => {
		if(window.innerWidth >= 1000) device.value = "ld";
		else device.value = "sd";
	});

	//handle dark-mode
	if(localStorage.getItem("isDarkMode") === "true" || localStorage.getItem("isDarkMode") === true){
		setUserSettings({isDarkMode: true});
		document.documentElement.className = "dark-mode";
	}
	else setUserSettings({isDarkMode: false});

	//handle user and user-settings
	if(token){
		const user = await getUserFromServer(token);
		setUser({
			name: user.name,
			email: user.email,
			token: token
		});
	}

	isInitialized.value = true;
});

async function getUserFromServer(token){
	const options = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	};

	const {data, errors} = await useFetch("/get-user", options);

	return data.value.user;
} 
</script>

<template>
	<Toast></Toast>

	<TheNavbar v-if="isInitialized" />

	<div class="intersecting-area"></div>

	<main>
		<RouterView v-if="isInitialized" />
	</main>

	<footer>
		<TheFooter />
	</footer>
</template>

<style scoped>
.intersecting-area {
	height: 100px;
	position: absolute;
}

main {
	min-height: 100dvh;
}

footer {
	width: 100%;
	height: 50px;
	padding: 0 2rem;
	border-top: 1px solid var(--p-surface-500);
}
</style>
