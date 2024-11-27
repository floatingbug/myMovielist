<script setup>
import {ref, onMounted} from "vue";
import Movie from "./Movie.vue";
import Panel from 'primevue/panel';
import ProgressSpinner from "@/utils/ProgressSpinner.vue";


const props = defineProps({
	movielist: Object
});


const isProcessing = ref(false);
const isCollapsed = ref(true);
</script>


<template>
	<Panel class="list" :header="props.movielist.name" :collapsed="isCollapsed" toggleable>
		<ProgressSpinner v-if="isProcessing"></ProgressSpinner>

		<h1>{{props.movielist.name}}</h1>
		
		{{props.movielist.description}}
				
		<div class="movies-container">
			<Movie v-for="movie in props.movielist.movies" :movie="movie" :movielistId="props.movielist.movielistId" @processing="isProcessing = $event.isProcessing"></Movie>
		</div>
	</Panel>
</template>


<style scoped>
.list {
	width: 100%;
	min-width: 280px;
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem;
	border-radius: 8px;
	background-color: var(--movielist-bg);
}

.movies-container {
	display: flex;
	gap: 2rem;
	margin-top: 2rem;
}
</style>
