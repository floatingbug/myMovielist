<script setup>
import {onMounted} from "vue";
import { RouterLink, RouterView } from 'vue-router'
import useDeviceSize from "./composables/useDeviceSize.js";
import TheNavbarLd from "@/components/Navbar/TheNavbarLd.vue";
import TheNavbarSd from "@/components/Navbar/TheNavbarSd.vue";
import TheFooter from "@/components/footer/TheFooter.vue";
import {useUser} from "./store/useUser.js";


const {device} = useDeviceSize();
const {setUserSettings} = useUser();


onMounted(() => {
	if(window.innerWidth >= 800) device.value = "ld";
	else device.value = "sd";

	window.addEventListener("resize", (e) => {
		if(window.innerWidth >= 800) device.value = "ld";
		else device.value = "sd";
	});

	if(localStorage.getItem("isDarkMode") === true || localStorage.getItem("isDarkMode") === "true"){
		setUserSettings({isDarkMode: true});
	}
	else setUserSettings({isDarkMode: false});
});
</script>

<template>
	<TheNavbarLd v-if="device === 'ld'" />
	<TheNavbarSd v-if="device === 'sd'" />

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
	bottom: 0;
	padding: 0 2rem;
	border-top: 1px solid var(--p-surface-500);
}
</style>
