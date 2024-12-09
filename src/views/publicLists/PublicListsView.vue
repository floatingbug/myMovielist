<script setup>
import {ref, onMounted} from "vue";
import {getPublicLists} from "./helpers/getPublicLists.js";
import Movielist from "./components/Movielist.vue";


const movielists = ref([]);


onMounted(async () => {
	//get public lists
	const {data: dataPublicLists, errors: publicListsErrors} = await getPublicLists();

	movielists.value = dataPublicLists.value.movielists;
});
</script>


<template>
	<div class="public-lists-container">
		<header>
			<h1>Public Movielists</h1>
		</header>
		
		<main v-if="movielists">
			<div class="movielists-container">
				<Movielist class="movielist" v-for="(movielist, index) in movielists" :movielist="movielist">
				</Movielist>
			</div>
		</main>
		
		<footer></footer>
	</div>
</template>


<style scoped>
.public-lists-container {
	display: flex;
	flex-direction: column;
	gap: 4rem;
}

header {
	margin-top: 4rem;
}

header h1 {
	text-align: center;
}

.movielists-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4rem;
}

.movielist {
	width: 90%;
}
</style>
