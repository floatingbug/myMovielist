<script setup>
import {ref} from "vue";
import useDiscoverMovieStore from "@/stores/useDiscoverMovieStore.js";
import findMoviesByNameAPI from "../../api/findMoviesByNameAPI.js";
import systemStatus from "@/composables/systemStatus.js";


const {movieStoreMovies, movieStoreCurrMovies, movieStoreMetaData} = useDiscoverMovieStore();
const nameInput = ref("");


async function findMoviesByName(){
	systemStatus.value.isLoading = true;

	const result = await findMoviesByNameAPI({name: nameInput.value});
	movieStoreMovies.value = result.data;
	movieStoreCurrMovies.value = movieStoreMovies.value.slice(0, 20);

	const page = 1;
	const total_pages = Math.ceil(movieStoreMovies.value.length / 20);
	const total_results = movieStoreMovies.value.length;

	movieStoreMetaData.value = {
		page,
		total_pages,
		total_results,
	};
	
	systemStatus.value.isLoading = false;
}

</script>


<template>    
	<InputGroup>
		<InputGroupAddon>
			<i class="pi pi-search"></i>
		</InputGroupAddon>
		

		<FloatLabel>
			<InputText v-model="nameInput">
			</InputText>
			<label for="search">Search by Actor</label>
		</FloatLabel>
		
		<InputGroupAddon class="button-search-wrapper">
			<Button
				@click="findMoviesByName"
			>
				Search
			</Button>
		</InputGroupAddon>
	</InputGroup>
</template>   


<style scoped>
.button-search-wrapper {
	.p-button {
		min-width: 100px;
	}
}
</style>
