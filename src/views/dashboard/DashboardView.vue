<script setup>
import {ref} from "vue";
import SearchInput from "./components/SearchInput.vue";
import {handleSearchInput} from "./helpers/handleSearchInput.js";
import MovieCard from "@/components/MovieCard.vue";
import Paginator from "@/components/Paginator.vue";


const movies = ref([]);


async function handleSearchInputAction(event){
	if(event.action === "search" && event.data !== ""){
		const {data, errors} = await handleSearchInput({
			input: event.data
		});

		movies.value = data.value.data.movies;
		console.log(data.value);
	}
}

//handel pagination
async function updatePage(event){
	await handlePage({event, page, token, movies, metaData, filterQuery, isProcessing});
}
</script>


<template>
	<div class="dashboard-container">
		<header>
			<SearchInput @searchInput:action="handleSearchInputAction"></SearchInput>
		</header>
		
		<main>
			<div class="movies-container">
				<MovieCard v-for="(movie, index) in movies" :movie="movie">
				</MovieCard>
			</div>
		</main>
		
		<footer>
			<Paginator :rows="20" totalRecords="100" @pageChange="updatePage"></Paginator>
		</footer>
	</div>
</template>


<style scoped>
.dashboard-container {
	height: 100dvh;
}

header {
	width: 100%;
	min-width: 280px;
	height: 20%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

main {
	height: 60%;
}

footer {
	height: 20%;
}

.movies-container {
	display: flex;
	flex-wrap: wrap;
}
</style>
