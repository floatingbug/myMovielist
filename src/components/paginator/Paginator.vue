<script setup>
import Paginator from 'primevue/paginator';
import usePaginatorStore from "./stores/usePaginatorStore.js";


const props = defineProps({
	movieMetaData: Object,
});


const emit = defineEmits(["paginator:action"]);


const {currPage} = usePaginatorStore();


function emitAction(event){
	event.page++;

	if(event.page > 500) event.page = 500;

	currPage.value = event.page -1;

	emit("paginator:action", {
		action: "pageChange",
		data: {
			page: event.page,
		}
	});
}

</script>


<template>    
	<Paginator 
		:rows="20" 
		:totalRecords="movieMetaData.total_results" 
		:first="currPage * 20"
		@page="emitAction"
	>
	</Paginator>
</template>   


<style scoped>
</style>
