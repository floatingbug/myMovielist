<script setup>
import {ref, watch} from "vue";
import Paginator from 'primevue/paginator';


const emit = defineEmits(["paginator:action"]);


const props = defineProps({
	rows: Number,
	totalRecords: Number,
});


const adjustedTotalRecords = ref(props.totalRecords);


const paginatorActions = {
	emitPage: (event) => {
		//TMDB index starts with 1, paginator with 0 therefore page++
		event.page++;

		emit("paginator:action", {
			action: "page",
			target: {
				type: "findMovies"
			},
			data: event
		});
	}
}


//TMDB max page number is 500. if totalRecords are to high for 500 pages, reduce totalRecords
watch(() => props.totalRecords, (newVal) => {
	const pageCount = props.totalRecords / props.rows;

	if(pageCount > 500){
		adjustedTotalRecords.value = 20 * 500;
	}
	else{
		adjustedTotalRecords.value = props.totalRecords;
	}
});
</script>


<template>
   	<Paginator :rows="rows" :totalRecords="adjustedTotalRecords" @page="paginatorActions.emitPage" />
</template>



