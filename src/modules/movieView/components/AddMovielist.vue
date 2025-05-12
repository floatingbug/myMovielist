<script setup>
import {ref} from "vue";
import Popover from "primevue/popover";


const props = defineProps({
	movieId: Number,
});


const emit = defineEmits(["addMovielist:action"]);


const op = ref(null);
const movielistName = ref("");

const addMovielistActions = {
	addMovielist: () => {
		emit("addMovielist:action", {
			action: "addMovielist",
			data: {
				movielistName: movielistName.value,
				movieId: props.movieId,
			},
		});
	},
};


function toggleAddNewMovielist(event){
	movielistName.value = "";
	op.value.toggle(event);
}
</script>


<template>    
	<Popover ref="op">
		<div class="add-movielist-form">
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-list"></i>
				</InputGroupAddon>
			
				<FloatLabel>
					<InputText v-model="movielistName" />
					<label for="movielistName">Movielist name</label>
				</FloatLabel>
			</InputGroup>

			<Button
				severity="secondary"
				:disabled="movielistName !== '' ? false : true"
				@click="addMovielistActions.addMovielist"
			>
				Add Movielist
			</Button>
		</div>
	</Popover>
	
	<Button
		severity="secondary"
		@click="toggleAddNewMovielist"
	>
		Add new movielist
	</Button>
</template>   


<style scoped>
.add-movielist-form {
	height: 200px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
	gap: 2rem;
}
</style>
