<script setup>
import {ref, onMounted} from "vue";
import Movie from "./Movie.vue";
import Panel from 'primevue/panel';
import ProgressSpinner from "@/utils/ProgressSpinner.vue";
import MovielistMenu from "./MovielistMenu.vue";


const props = defineProps({
	movielist: Object
});


const emit = defineEmits();


const isProcessing = ref(false);
const isCollapsed = ref(true);


function handleMenuActions(data){
	emit("menu:action", data);
}
</script>


<template>
	<Panel class="list" :collapsed="isCollapsed" toggleable>
		<template #header>
			<div class="panel-header-left">
				<span>
					{{props.movielist.name}}
				</span>
				
				<MovielistMenu class="movielist-menu" :movielistId="props.movielist.movielistId" @menu:action="handleMenuActions"></MovielistMenu>
			</div>
		</template>

		<ProgressSpinner v-if="isProcessing"></ProgressSpinner>

		<h2 style="text-align: center;">{{props.movielist.name}}</h2>
		
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

:deep(.p-panel-content) {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
}

.movies-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 2rem;
	margin-top: 2rem;
}

.panel-header-left {
	display: flex;
	align-items: center;
	gap: 2rem;
}
</style>
