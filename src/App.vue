<script setup>
import {onMounted} from "vue";
import { RouterLink, RouterView } from 'vue-router'
import useDeviceSize from "./composables/useDeviceSize.js";
import TheNavbarLd from "@/components/Navbar/TheNavbarLd.vue";
import TheNavbarSd from "@/components/Navbar/TheNavbarSd.vue";
import TheNavbarSignedInLd from "@/components/Navbar/TheNavbarSignedInLd.vue";
import TheNavbarSignedInSd from "@/components/Navbar/TheNavbarSignedInSd.vue";
import TheFooter from "@/components/footer/TheFooter.vue";
import {useUser} from "./store/useUser.js";


const {device} = useDeviceSize();
const {setUserSettings, getUserSettings} = useUser();
const userSettings = getUserSettings();



onMounted(() => {
	//handle device
	if(window.innerWidth >= 800) device.value = "ld";
	else device.value = "sd";

	window.addEventListener("resize", (e) => {
		if(window.innerWidth >= 800) device.value = "ld";
		else device.value = "sd";
	});

	//handle dark-mode
	if(localStorage.getItem("isDarkMode") === true || localStorage.getItem("isDarkMode") === "true"){
		setUserSettings({isDarkMode: true});
		document.documentElement.className = "dark-mode";
	}
	else setUserSettings({isDarkMode: false});

	//handle user settings
	if(localStorage.getItem("isSignedIn") === true || localStorage.getItem("isSignedIn") === "true"){
		setUserSettings({isSignedIn: true});
	}
});
</script>

<template>
	<TheNavbarLd v-if="device === 'ld' && !userSettings.isSignedIn" />

	<TheNavbarSd v-if="device === 'sd' && !userSettings.isSignedIn" />
	
	<TheNavbarSignedInLd v-if="device === 'ld'" />

	<TheNavbarSignedInSd v-if="device === 'sd'" />

	<main>
		<RouterView />
	</main>

	<footer>
		<TheFooter />
	</footer>
</template>

<style scoped>
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
