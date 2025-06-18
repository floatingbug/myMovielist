<script setup>
import {ref, onMounted} from "vue";
import getMovielistsAPI from "./api/getMovielistsAPI.js";
import Movielist from "./components/Movielist.vue";
import useMovielistStore from "@/stores/useMovielistStore.js";
import removeMovielistAPI from "./api/removeMovielistAPI.js";
import {useToast} from "primevue/usetoast";


const {movielists} = useMovielistStore();
const toast = useToast();
const listNumber = ref(null);


onMounted(async () => {
	const result = await getMovielistsAPI();
	movielists.value = result.data;
});


function openList(index){
	listNumber.value = index;
}


async function onMovielistAction(event){
	if(event.action === "close"){
		listNumber.value = 99;
	}
	else if(event.action === "removeMovielist"){
		const result = await removeMovielistAPI({movielistId: event.movielistId});

		const movielistIndex = movielists.value.findIndex(movielist => movielist.movielistId === event.movielistId);
		movielists.value.splice(movielistIndex, 1);
		toast.add({ 
			severity: 'info', 
			summary: 'Removed', 
			detail: 'Movielist has been removed.', 
			life: 3000,
			group: "tl",
		});
	}
}

</script>


<template>    
	<div class="layout">
		<h1>Movielists</h1>
			
		<div class="movielists">
			<Movielist
				v-for="(movielist, index) in movielists"
				class="movielist"
				:key="index"
				:movielist="movielist"
				:listNumber="listNumber"
				:listId="index"
				@movielist:action="onMovielistAction"
				@click="openList(index)"
			/>
		</div>
	</div>
</template>   


<style scoped>
.movielists {
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 2rem;
	flex-wrap: wrap;
	margin-top: 3rem;
}

.movielist {
	width: 90%;
	min-width: 300px;
	max-width: 300px;
}
</style>
