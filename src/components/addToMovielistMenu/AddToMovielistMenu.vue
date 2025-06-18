<script setup>
import {ref, onMounted} from "vue";
import TieredMenu from 'primevue/tieredmenu';
import CreateMovielist from "../createMovielist/CreateMovielist.vue";
import movielistsStore from "./stores/movielistsStore.js";
import getMovielistsAPI from "./api/getMovielistsAPI.js";
import useUserStore from "@/stores/userStore.js";


const emit = defineEmits(["addToMovielistMenu:action"]);


const {user} = useUserStore();
const menu = ref(null);
const movielistItems = ref([]);
const createMovielistTrigger = ref(1);


onMounted(async () => {
	// get movielists
	const movielists = await getMovielistsAPI();
	const ownMovielists = movielists.data.filter(movielist => movielist.userId === user.userId);
	movielistsStore.value = ownMovielists;

	movielistsStore.value.forEach(movielist => {
		movielistItems.value.push({
			label: movielist.movielistname,
			command: function(){
				emit("addToMovielistMenu:action", {
					action: "addMovie",
					movielistId: movielist.movielistId,
				});
			},
		});
	});

	movielistItems.value.push({
		label: "Create Movielist",
		command: function(){
			createMovielistTrigger.value *= -1;
		},
	});
});


function toggle(event){
	menu.value.toggle(event);
}


async function handleCreateMovielistEvents(event){
	if(event.action === "create"){
		emit("addToMovielistMenu:action", {
			action: "create",
			movielistname: event.movielistname
		});
	}
}

</script>


<template>    
	<Button @click="toggle">
		Add to Movielist
	</Button>
	<TieredMenu ref="menu" id="overlay_tmenu" :model="movielistItems" popup />

	<CreateMovielist
		:trigger="createMovielistTrigger"
		@createMovielist:action="handleCreateMovielistEvents"
	/>
</template>   


<style scoped>
</style>
