<script setup>
import {ref, onMounted, toRaw} from "vue";
import Chip from "primevue/chip";
import getGenreList from "../api/getGenreList.js";
import useMovieStore from "../../../stores/movieStore.js";


const {genreList} = useMovieStore();
const selectedGenres = ref(null);


const emit = defineEmits(["filterGenres:action"]);


onMounted(async () => {
	if(genreList.value.length === 0){
		genreList.value = await getGenreList();
		genreList.value.forEach(genre => genre.isSelected = false);
	}
});


function handleClickOnGenre(genre){
	genre.isSelected = !genre.isSelected;
	selectedGenres.value = [];
	selectedGenres.value = genreList.value
		.filter(genre => genre.isSelected)
		.map(genre => ({
			name: genre.name,
			id: genre.id,
		}))

	emit("filterGenres:action", {
		action: "selectedGenres",
		data: {
			selectedGenres: toRaw(selectedGenres.value),
		},
	});
}

</script>


<template>    
	<div class="chips" v-if="genreList">
		<Chip
			v-for="(genre, index) in genreList"
			:key="index"
			:class="genre.isSelected ? 'chips__genre-selected' : ''"
			@click="handleClickOnGenre(genre)"
		>
			{{genre.name}}
		</Chip>
	</div>
</template>   


<style scoped>
.chips {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
	user-select: none;

	.p-chip {
		cursor: pointer;
	}
}

.chips__genre-selected {
	color: var(--text-color-dark);
	background-color: var(--contrast-color);
}
</style>
