<script setup>
import {ref, onMounted} from "vue";
import Panel from "primevue/panel"
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";


const props = defineProps({
	genreList: Object
});


const emit = defineEmits(["query"]);


const genreButtons = ref([
	{id: 1, label: "Action", isButtonActive: false},
]);
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


// create query and send it to parent component
async function sendQuery(){

	let queryString = "";

	// filter for genre
	const genreIds = genreButtons.value.
		filter(button => button.isButtonActive).
		map(button => button.id);

	if(genreIds.length > 0){
		queryString += `with_genres=${genreIds}&`;
	}

	queryString = queryString.slice(0, -1);

	emit("query", queryString);
}


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
	</Panel>
	
	<Button @click="sendQuery">Search</Button>
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
</style>
