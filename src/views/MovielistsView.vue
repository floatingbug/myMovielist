<script setup>
import {ref, onMounted} from "vue";
import {getMovielists} from "@/components/movielists/helpers/getMovielists.js";
import {useUser} from "@/store/useUser.js";
import Movielist from "@/components/movielists/components/Movielist.vue";
import ProgressSpinner from "@/utils/ProgressSpinner.vue";
import {deleteMovielist} from "@/components/movielists/helpers/deleteMovielist.js";
import {useToast} from "primevue/usetoast";


const {getUser} = useUser();
const user = getUser();
const isInitialized = ref(false);
const movielists = ref([]);
const isProcessing = ref(false);
const toast = useToast();


onMounted(async () => {
	//store movielists in user store (user.movielists)
	await getMovielists();

	isInitialized.value = true;
});


async function handleMenuActions(eventData){
	isProcessing.value = true;

	let data = null;
	let errors = null;

	if(eventData.action === "delete" && eventData.target.type === "movielist"){
		({data, errors} = await deleteMovielist(eventData.target.movielistId));
	}
	
	if(!data.value.success){
		toast.add({ severity: 'info', summary: 'Not deleted', detail: data.value.msg, life: 3000 });
	}

	//delete movielist from user store
	user.movielists = user.movielists.filter(
		movielist => movielist.movielistId !== eventData.target.movielistId
	);

	toast.add({ severity: 'info', summary: 'Deleted', detail: data.value.msg, life: 3000 });

	isProcessing.value = false;
}
</script>


<template>
	<ProgressSpinner v-if="isProcessing"></ProgressSpinner>

	<header>
		<h1>Movielists</h1>
	</header>

	<main>
		<div class="movielists-container">
			<div class="movielists-content">
				<Movielist v-if="isInitialized" v-for="movielist in user.movielists" :movielist="movielist" @menu:action="handleMenuActions"></Movielist>
			</div>
		</div>
	</main>

	<footer></footer>
</template>


<style scoped>
.movielists-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.movielists-content {
	width: 90%;
	min-width: 280px;
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	gap: 2rem;
}

header {
	padding: 5rem 0;
}

header h1 {
	text-align: center;
}
</style>
