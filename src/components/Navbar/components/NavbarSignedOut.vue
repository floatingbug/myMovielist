<script setup>
import {ref} from "vue";
import SubmenuUser from  "./SubmenuUser.vue";
import {useUser} from "@/store/useUser.js";
import useDeviceSize from "@/composables/useDeviceSize.js";
import ToggleSwitch from "./ToggleSwitch.vue";


const isUserMenuOpen = ref(true);
const {getUserSettings, getUser} = useUser();
const {device} = useDeviceSize();
const userSettings = getUserSettings();
const user = getUser();
const isNavbarClosed = ref(true);


function closeNavbar(e){
	if(e.target.closest("a")){
		isNavbarClosed.value = true;
	}
};
</script>


<template>
	<!-- navbar large device -->
	<div v-if="device === 'ld'" class="navbar-container-ld">
		<div class="navbar-left">
			<Button as="router-link" to="/" variant="text">
				<h2>
					myMovielist
				</h2>
			</Button>
		</div>
	
		<div class="navbar-center">
		</div>
	
		<div class="navbar-right">
			<div class="links">
				<Button as="router-link" to="/sign-in" severity="secondary"  variant="text">Sign in</Button>
				
				<Button as="router-link" to="/sign-up" severity="info" rounded>Sign up</Button>
			</div>

			<SubmenuUser v-if="user.isSignedIn"></SubmenuUser>

			<ToggleSwitch></ToggleSwitch>
		</div>
	</div>

	<!-- navbar small device -->
	<div v-if="device === 'sd'" class="navbar-container-sd" :class="{'open-navbar': !isNavbarClosed}" @click="closeNavbar">
		<div class="navbar-top">
			<div class="logo">
				<Button as="router-link" to="/" variant="text">
					<h2>
						myMovielist
					</h2>
				</Button>
			</div>
		</div>

		<div class="navbar-center">
			<div class="sign-buttons">
				<Button as="router-link" to="/sign-in" severity="contrast" variant="outlined">Sign in</Button>
				
				<Button as="router-link" to="/sign-up" severity="contrast" variant="outlined">Sign up</Button>
			</div>
		</div>

		<div class="navbar-bottom">
			<div>
				<div class="bottom">
					<div>
						<Button icon="pi pi-bars" variant="text" @click="isNavbarClosed = true;"></Button>
					</div>

					<div class="right">
						<SubmenuUser v-if="user.isSignedIn"></SubmenuUser>
						<ToggleSwitch></ToggleSwitch>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- sd navbar toggle button -->
	<Button v-if="device === 'sd'" class="sd-navbar-toggle-button" icon="pi pi-bars" size="large" variant="text" @click="isNavbarClosed = !isNavbarClosed"></Button>
</template>


<style scoped>
/* global css */
a {
	text-decoration: none;
}

/* navbar large device */
.navbar-container-ld {
	width: 100%;
	height: 64px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;
	border-bottom: 1px solid var(--navbar-border-color-ld);
	background-color: var(--navbar-bg-ld);
}

.navbar-container-ld .navbar-left, 
.navbar-container-ld .navbar-center, 
.navbar-container-ld .navbar-right {
	display: flex;
	gap: 1rem;
}

.navbar-container-ld .navbar-right {
	align-items: center;
	gap: 3rem;
}

/* navbar small device */
.navbar-container-sd {
	width: 400px;
	height: 50dvh;
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: var(--navbar-bg-sd);
	backdrop-filter: blur(20px);
	z-index: 1000;
	transform: translate(0, -100%);
	transition: transform 250ms;
}

.open-navbar {
	transform: translate(0, 0);
}

.navbar-container-sd .p-button {
	font-size: 1.4rem;
}

.navbar-container-sd .navbar-top, 
.navbar-container-sd .navbar-center,
.navbar-container-sd .navbar-bottom {
	display: flex;
	flex-direction: column;
}

.navbar-container-sd a {
	width: 100%;
}

.navbar-top .logo{
	display: flex;
	justify-content: center;
}

.navbar-top {
	border-bottom: 1px solid var(--navbar-border-color-ld);
	background-color: var(--navbar-header-bg);
}

.user-menu {
	display: flex;
	justify-content: center;
}

.navbar-bottom {
	justify-content: space-between;
	border-top: 1px solid var(--navbar-border-color-ld);
	background-color: var(--navbar-header-bg);
}

.navbar-container-sd .sign-buttons {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	padding: 2rem;
}

.navbar-bottom .bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1rem;
}

.navbar-bottom .right {
	display: flex;
	align-items: center;
	gap: 2rem;
}

.sd-navbar-toggle-button {
	left: 50%;
	top: 0;
	transform: translate(-50%, 0);
}

@media(max-width: 500px) {
	.navbar-container-sd {
		width: 100%;
		height: 80dvh;
	}
}
</style>
