<script setup>
import {onMounted} from "vue";
import { RouterView, useRouter } from 'vue-router'
import {displaySize} from "@/utils/device.js";
import Toast from 'primevue/toast';
import TheMenu from "./components/menu/TheMenu.vue";
import useUser from "./stores/userStore.js";


const {user} = useUser();
const router = useRouter();


onMounted(() => {
	displaySize.value = window.innerWidth;

	window.addEventListener("resize", () => {
		displaySize.value = window.innerWidth;
	});

	if(user.isSignedIn){
		router.push("/dashboard");
	}
});

</script>

<template>
	<Toast />
	<TheMenu></TheMenu>

  <RouterView />
</template>

<style scoped>
</style>
