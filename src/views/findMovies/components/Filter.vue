<script setup>
import {ref, onMounted} from "vue";
import Panel from "primevue/panel"
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import createQueryString from "../helpers/createQueryString.js";


const props = defineProps({
	genreList: Array
});


const emit = defineEmits(["filter:action"]);


const genreButtons = ref([]);
const isCollapsed = ref(true);


onMounted(() => {
	// create genre buttons 
	genreButtons.value = props.genreList.map(genre => {
		return {
			id: genre.id,
			label: genre.name,
			isButtonActive: false
		};
	});
});



const filerActions = {
	emitQuery: () => {
		const queryString = createQueryString({genreButtons});

		emit("filter:action", {
			action: "filter",
			target: {
				type: "findMovies"
			},
			data: {
				query: queryString
			}
		});
	}
};




// acivate or deactivate genre buttons on click
function handleGenreButton(button){
	const targetButton = genreButtons.value.find(currButton => currButton.id === button.id);
	targetButton.isButtonActive = !targetButton.isButtonActive;
}
</script>


<template>
	<Panel header="Filter" :collapsed="isCollapsed" toggleable>
		<div class="panel-content">
			<div class="filter">
				<h1>Genre</h1>
				<div class="filter-buttons">
					<Button v-for="button in genreButtons" 
						:class="{'button-active': button.isButtonActive}" 
						severity="contrast" variant="outlined" 
						size="small" rounded
						@click="handleGenreButton(button)" >{{button.label}}</Button>
				</div>
			</div>
		</div>
		
		<Button class="search-button" @click="filerActions.emitQuery">Search</Button>
	</Panel>
	
</template>


<style scoped>
.panel-content {
	display: flex;
	flex-direction: column;
	padding: 2rem 0;
}

.filter {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.filter h1 {
	font-size: 1.4rem;
}

.filter-buttons {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
}

.p-button.button-active {
    background-color: var(--p-button-secondary-active-background);
}

.p-button.button-active:hover {
    background-color: var(--p-button-secondary-active-background) !important;
}

.search-button {
	width: 100%;
}
</style>
