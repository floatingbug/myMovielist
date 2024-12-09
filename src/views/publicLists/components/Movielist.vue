<script setup>
import {ref} from "vue";
import Panel from "primevue/panel";
import MovieCard from "./MovieCard.vue";


const props = defineProps({
	movielist: Object
});


const isCollapsed = ref(true);
</script>


<template>
	<Panel class="list" :collapsed="isCollapsed" toggleable>
		<template #header>
			<div class="panel-header-left">
				<span>
					{{props.movielist.name}} |
				</span>

				<span>
					Created by: {{props.movielist.movielistOwner}}
				</span>
			</div>
		</template>

		<div class="movielist-container">
			<header>
				<h2 style="text-align: center;">{{props.movielist.name}}</h2>
				
				<div class="movielist-description">
					{{props.movielist.description}}
				</div>
			</header>
					
			<div class="movies-container">
				<MovieCard v-for="(movie, index) in movielist.movies" :movie="movie">
				</MovieCard>
			</div>
		</div>
	</Panel>
</template>


<style scoped>
.movielist-container {
	display: flex;
	flex-direction: column;
	gap: 4rem;
}

header {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
}

.movies-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 4rem;
}
</style>
