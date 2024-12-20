<script setup>
import {ref, onMounted} from "vue";
import { RouterLink, RouterView } from 'vue-router'
import useDeviceSize from "./composables/useDeviceSize.js";
import TheNavbar from "./components/Navbar/TheNavbar.vue";
import TheFooter from "@/components/footer/TheFooter.vue";
import {useUser} from "./store/useUser.js";
import {useFetch} from "./composables/useFetch.js";
import {useProgress} from "./composables/useProgress.js";
import ProgressSpinner from "./components/ProgressSpinner.vue";
import MoveUpButton from "./components/MoveUpButton.vue";



const {device} = useDeviceSize();
const {setUserSettings, getUserSettings, setUser, getUser} = useUser();
const userSettings = getUserSettings();
const user = getUser();
const isProgress = useProgress();
const isInitialized = ref(false);


onMounted(async () => {
	isProgress.value = true;

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
		const {data, errors} = await getUserFromServer(token);


		if(data.value.success){
			setUser({
				name: user.name,
				email: user.email,
				token: token
			});
		}
	}

	isInitialized.value = true;
	isProgress.value = false;
});

async function getUserFromServer(token){
	const options = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	};

	const {data, errors} = await useFetch("/get-user", options);

	return {data, errors};
} 


function handleMoveActions(event){
	if(event.target.type !== "APP") return;

	if(event.action === "moveUp"){
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
}
</script>

<template>
	<MoveUpButton class="move-up-button" @move:action="handleMoveActions"></MoveUpButton>

	<ProgressSpinner v-if="isProgress"></ProgressSpinner>

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
	height: 200px;
	border-top: 1px solid var(--p-surface-500);
	margin-top: 10rem;
}

.move-up-button {
	position: fixed;
	right: 1rem;
	top: 2rem;
	z-index: 1000;
}
</style>
