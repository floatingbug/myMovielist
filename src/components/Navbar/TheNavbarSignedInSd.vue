<script setup>
import {ref} from "vue";
import ToggleSwitch from "./components/ToggleSwitch.vue";


const isNavbarActive = ref(true);

</script>


<template>
	<div class="container-navbar">
		<div class="content-navbar" :class="{'content-navbar-active': isNavbarActive}">
			<header>
				<h1>myMovielist</h1>
			</header>

			<main>
				<div class="main-content">
					<Button as="router-link" to="/find-movies" label="Find movies" @click="isNavbarActive = false"></Button>
				
					<Button label="Movie lists"></Button>
					
					<Button label="Edit lists"></Button>
				</div>
			</main>

			<footer>
				<div class="top">
				</div>
				
				<div class="bottom">
					<div class="toggle-navbar-button">
						<Button icon="pi pi-bars" variant="text" size="large" @click="isNavbarActive = !isNavbarActive"></Button>
					</div>

					<div class="toggle-switch">
						<ToggleSwitch></ToggleSwitch>
					</div>
				</div>
			</footer>
		</div>
	</div>
</template>


<style scoped>
.container-navbar {
	width: 100%;
	height: 500px;
	position: absolute;
	top: 0;
	display: flex;
	justify-content: center;
}

.content-navbar {
	width: 90%;
	min-width: 280px;
	height: 100%;
	border-radius: 0 0 30px 30px;
	background-color: var(--navbar-bg-sd);
	backdrop-filter: blur(8px);
	z-index: 1000;
	transform: translate(0, -90%);
	transition: transform 250ms;
}

.content-navbar-active {
	transform: translate(0, 0);
}

header {
	height: 20%;
	display: flex;
	justify-content: center;
}

main {
	width: 100%;
	min-width: 280px;
	height: 60%;
	display: flex;
	justify-content: center;
}

.main-content {
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}

.main-content .p-button {
	width: 100%;
	text-decoration: none;
}

footer {
	height: 20%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
}

footer .top {
	width: 90%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem;
}

footer .top>a {
	text-decoration: none;
}

footer .bottom {
	width: 90%;
	display: flex;
	justify-content: space-between;
}

footer .bottom>div {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.toggle-navbar-button {
	width: calc(50% + 20px);
}
</style>
