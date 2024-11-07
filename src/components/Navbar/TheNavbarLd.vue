<script setup>
import {onMounted} from "vue";
import ToggleSwitch from "./components/ToggleSwitch.vue";
import {useUser} from "@/store/useUser.js";


const {setUserSettings, getUserSettings} = useUser();
const userSettings = getUserSettings();


onMounted(() => {
	if(localStorage.getItem("isDarkMode") === "true" || localStorage.getItem("isDarkMode") === true){
		document.documentElement.className = "dark-mode";
	}
});


function handleToggleSwitch(e){
	if(e){
		document.documentElement.className = "dark-mode";
		localStorage.setItem("isDarkMode", true);
		setUserSettings({isDarkMode: true});
	}
	else{
		document.documentElement.className = "";
		localStorage.setItem("isDarkMode", false);
		setUserSettings({isDarkMode: false});
	}
}
</script>


<template>
	<div class="nav-container">
		<div class="nav-content">
			<div class="left">
				<span>myMovielist</span>
			</div>

			<div class="mid"></div>

			<div class="right">
				<ToggleSwitch @toggleSwitch="handleToggleSwitch" :isDarkMode="userSettings.isDarkMode" />

				<div class="sign-buttons">
					<Button as="router-link" to="sign-in" label="Sign in" variant="outlined" raised />
					<Button as="router-link" to="sign-up" label="Sign up" variant="text" />
				</div>
			</div>
		</div>
	</div>
</template>


<style scoped>
.nav-container {
	width: 100%;
	display: flex;
	justify-content: center;
	background-color: var(--p-primary-500);
}

.nav-content {
	width: 90%;
	max-width: 1200px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 2rem;
}

.left span {
	font-size: 1.4rem;
	font-weight: 1.4rem;
	color: var(--p-primary-contrast-color);
}

.right {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.sign-buttons>a {
	text-decoration: none;
	color: var(--p-primary-contrast-color);
}
</style>
