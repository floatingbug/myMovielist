<script setup>
import {ref, onMounted} from "vue";
import useMovies from "@/stores/moviesStore.js";
import getMovies from "../../services/getMovies.js";


const {movies} = useMovies();
console.log(movies);


onMounted(async () => {
	//get movies
	movies.value = await getMovies();

	console.log("--------->", movies.value.data);
});

</script>


<template>    
</template>   


<style scoped>
</style>
