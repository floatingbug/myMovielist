<script setup>
import {onMounted} from "vue";
import ToggleSwitch from "./components/ToggleSwitch.vue";
</script>


<template>
	<div class="nav-container">
		<div class="nav-content">
			<div class="left">
				<span>myMovielist</span>
			</div>

			<div class="mid">
				<Button as="router-link" to="/find-movies" label="Find movies" variant="text" severity="contrast" @click="isNavbarActive = false"></Button>
			
				<Button label="Movie lists" variant="text" severity="contrast" @click="isNavbarActive = false"></Button>
				
				<Button label="Edit lists" variant="text" severity="contrast" @click="isNavbarActive = false"></Button>
			</div>

			<div class="right">
				<ToggleSwitch />
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

.mid .p-button {
	text-decoration: none;
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
