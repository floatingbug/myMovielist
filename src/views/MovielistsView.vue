<script setup>
import {ref, onMounted} from "vue";
import {getMovielists} from "@/components/movielists/helpers/getMovielists.js";
import {useUser} from "@/store/useUser.js";
import Movielist from "@/components/movielists/components/Movielist.vue";


const {getUser} = useUser();
const user = getUser();
const isInitialized = ref(false);
const movielists = ref([]);


onMounted(async () => {
	//store movielists in user store (user.movielists)
	await getMovielists();

	isInitialized.value = true;
});
</script>


<template>
	<header>
		<h1>Movielists</h1>
	</header>

	<main>
		<div class="movielists-container">
			<div class="movielists-content">
				<Movielist v-if="isInitialized" v-for="movielist in user.movielists" :movielist="movielist"></Movielist>
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
