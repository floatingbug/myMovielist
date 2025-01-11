<script setup>
import {ref} from "vue";
import FloatLabel from "primevue/floatlabel";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";


const emit = defineEmits();


const searchActions = {
	searchMovies: function (){
		emit("searchInput:action", {
			action: "search",
			target: {
				type: "searchInput"
			},
			data: input.value
		});
	}
};
const input = ref("");
</script>


<template>
	<InputGroup>
		<FloatLabel>
			<InputText id="search-input" v-model="input"></InputText>
			<label for="search-input">Search by movie or actor</label>
		</FloatLabel>
		
		<InputGroupAddon>
			<Button label="Search" @click="searchActions.searchMovies"></Button>
		</InputGroupAddon>
	</InputGroup>
</template>


<style scoped>
.p-inputgroup {
	width: 50%;
	min-width: 280px;
}
</style>
