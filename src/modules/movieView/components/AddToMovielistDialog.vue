<script setup>
import {ref, watch, onMounted} from "vue";
import MovielistButtons from "./MovielistButtons.vue";
import AddMovielist from "./AddMovielist.vue";
import useHandleMovielistEvents from "../handlers/useHandleMovielistEvents.js";
import {useToast} from "primevue/usetoast";
import getMovielistsAPI from "@/api/getMovielistsAPI.js";


const toast = useToast();
const movielists = ref([]);
const isVisible = ref(false);

const handleMovielistEvents = useHandleMovielistEvents({
	toast,
	setVisible: (val) => isVisible.value = val,
	updateMovielist: (val) => movielists.value = val,
});


const props = defineProps({
	triggerAddToMovielist: Number,
	movieId: Number,
});


onMounted(async () => {
	const fetchedMovielists = await getMovielistsAPI();
	movielists.value = fetchedMovielists.data;
});


watch(() => props.triggerAddToMovielist, () => {
	isVisible.value = true;
});

</script>


<template>    
	<Dialog 
		v-model:visible="isVisible" 
		modal
		@update:visible="isVisible = false"
	>
		<div class="dialog-content">
			<h3>Movielists</h3>
			
			<MovielistButtons 
				:movielists="movielists"
				:movieId="movieId"
				@movielistButtons:action="handleMovielistEvents.movieButtonsEvent"
			/>
			
			<div class="add-movielist">
				<AddMovielist 
					:movieId="movieId"
					@addMovielist:action="handleMovielistEvents.addMovielistEvent"
				/>
			</div>
		</div>
	</Dialog>
</template>   


<style scoped>
.dialog-content {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}
</style>
