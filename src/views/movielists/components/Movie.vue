<script setup>
import {ref} from "vue";
import ScrollPanel from 'primevue/scrollpanel';
import MovieMenu from "./MovieMenu.vue";
import {deleteMovie} from "../helpers/deleteMovie.js";
import {useUser} from "@/store/useUser.js";
import {useToast} from "primevue/usetoast";


const props = defineProps({
	movie: Object,
	movielistId: String
});


const emit = defineEmits(["processing"]);


const {getUser} = useUser();
const user = getUser();
const movieMenuItems = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'delete',
                icon: 'pi pi-delete-left',
				command: handleDeleteMovie
            }
        ]
    }
]);
const toast = useToast();


async function handleDeleteMovie(){
	emit("processing", {isProcessing: true});
	
	const {data, errors} = await deleteMovie({
		movieId: props.movie.movieId, 
		movielistId: props.movielistId
	});

	user.movielists.forEach(list => {
		if(list.movielistId === props.movielistId){
			list.movies = list.movies.filter(movie => movie.movieId !== props.movie.movieId);
		}
	});
	
	emit("processing", {isProcessing: false});

	if(data.success){
    	toast.add({ severity: 'info', summary: 'Movie deleted', detail: data.value.msg, life: 3000 });
	}
	else{
    	toast.add({ severity: 'warn', summary: 'Not deleted', detail: data.value.msg, life: 3000 });
	}
}
</script>


<template>
	<div class="movie">
		<header>
			<h3>{{movie.title}}</h3>

			<MovieMenu class="movie-menu" :items="movieMenuItems"></MovieMenu>
		</header>

		<main>
			<img :src="movie.cover" alt="">

			<ScrollPanel style="width: 100%; height: 100px;">
				<p>
					{{movie.description}}
				</p>
			</ScrollPanel>
		</main>

		<footer>
		</footer>
	</div>
</template>


<style scoped>
.movie {
	width: 320px;
	min-width: 280px;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 2rem;
	border-radius: 8px;
	background-color: var(--movie-bg);
}

main {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

header {
	position: relative;
}

img {
	width: 100%;
}

.movie-menu {
	position: absolute;
	top: 0px;
	right: 0px;
	transform: translate(2rem, -2rem);
}
</style>
