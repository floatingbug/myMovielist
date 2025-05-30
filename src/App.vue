<script setup>
import {onMounted} from "vue";
import { RouterView, useRouter } from 'vue-router'
import Toast from 'primevue/toast';
import TheMenu from "./components/menu/TheMenu.vue";
import ProgressSpinner from "primevue/progressspinner";
import systemStatus from "@/composables/systemStatus.js";


const router = useRouter();


onMounted(() => {
});

</script>

<template>
	<Toast />

	<div class="progressspinner" v-if="systemStatus.isLoading">
		<ProgressSpinner />
	</div>

	<TheMenu></TheMenu>

  <RouterView />
</template>

<style scoped>
.progressspinner {
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	background-color: var(--card-bg-glass);
	backdrop-filter: blur(8px);
}
</style>
