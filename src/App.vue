<script setup>
import {ref, onMounted} from "vue";
import { RouterView, useRouter } from 'vue-router'
import Toast from 'primevue/toast';
import TheMenu from "./components/menu/TheMenu.vue";
import ProgressSpinner from "primevue/progressspinner";
import systemStatus from "@/composables/systemStatus.js";
import useUserStore from "@/stores/userStore.js";
import apiGetUserByJWT from "@/api/apiGetUserByJWT.js";
import Footer from "@/components/footer/Footer.vue";


const {setUser, user} = useUserStore();
const router = useRouter();
const isInitialized = ref(false);


onMounted(async () => {

	// set user
	const isSignedIn = localStorage.getItem("isSignedIn");
	if(isSignedIn === "true" || isSignedIn === true){
		const jwt = localStorage.getItem("jwt");
		
		//if test user is signed in skip
		if(jwt === "1" || jwt === "2"){
			return isInitialized.value = true;
		}

		const fetchedUser = await apiGetUserByJWT({jwt});

		setUser({
			userId: fetchedUser.data.userId,
			name: fetchedUser.data.name,
			jwt,
			isSignedIn: true,
		});
	}

	isInitialized.value = true;
});

</script>

<template>
	<Toast position="top-left" group="tl" />

	<div class="progressspinner" v-if="systemStatus.isLoading">
		<ProgressSpinner />
	</div>

	<TheMenu></TheMenu>

  <div v-if="isInitialized">
  	<RouterView />
  </div>

  <Footer />
</template>

<style scoped>
.progressspinner {
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	background-color: var(--card-bg-glass);
	backdrop-filter: blur(8px);
}
</style>
