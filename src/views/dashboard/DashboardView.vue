<script setup>
import {ref, onMounted} from "vue";
import {getMovielists} from "@/utils/getMovielists.js";
import {getWatchlist} from "@/utils/getWatchlist.js";
import {getRatings} from "@/utils/getRatings.js";
import Movielists from "./components/Movielists.vue";
import Watchlist from "./components/Watchlist.vue";
import Ratings from "./components/Ratings.vue";


const publicMovielists = ref([]);
const privateMovielists = ref([]);
const watchlist = ref([]);
const ratings = ref([]);


onMounted(async () => {
	//get movielists
	const {data: data1, errors: errors1} = await getMovielists();

	if(data1.value.success){
		publicMovielists.value = data1.value.movielists.filter(movielist => movielist.isPublic);
		privateMovielists.value = data1.value.movielists.filter(movielist => !movielist.isPublic);
	}


	//get watchlist
	const {data: data2, errors: errors2} = await getWatchlist();
	watchlist.value = data2.value.watchlist[0];

	//get ratings
	const {data: data3, errors: errors3} = await getRatings();
	ratings.value = data3.value.ratings;
});
</script>


<template>    
	<header>
		<h1>Dashboard</h1>
	</header>

	<main>
		<div class="movielists-container">
			<div class="private-movielists-container">
				<h1>Private Movielists</h1>

				<div class="private-movielists">
					<Movielists :movielists="privateMovielists"></Movielists>
				</div>
			</div>

			<div class="public-movielists-container">
				<h1>Public Movielists</h1>

				<div class="public-movielists">
					<Movielists :movielists="publicMovielists"></Movielists>
				</div>
			</div>
		</div>

		<div class="watchlist-ratings-container">
			<div class="watchlist">
				<h1>Watchlist</h1>

				<Watchlist :watchlist="watchlist"></Watchlist>
			</div>

			<div class="ratings">
				<h1>Ratings</h1>

				<Ratings :ratings="ratings"></Ratings>
			</div>
		</div>
	</main>
</template>   


<style scoped>
header {
	width: 100%;
	min-height: 20dvh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h1 {
		font-size: 3rem;
	}
}

main {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4rem;
}

.movielists-container, .watchlist-ratings-container {
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 2rem;
}

.private-movielists-container, .public-movielists-container, .watchlist, .ratings {
	width: 95%;
	min-width: 280px;
	max-width: 650px;
	height: 300px;
	flex: 0.35 1 280px;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 1rem;
	border-radius: var(--border-radius-soft);
	border: 1px solid var(--card-border-color);
	background-color: var(--card-bg);
}

.private-movielists, .public-movielists {
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow: auto;
	padding: 1rem;
	border-radius: var(--border-radius-hard);
	border: 1px solid var(--card-border-color-light);
}
</style>
