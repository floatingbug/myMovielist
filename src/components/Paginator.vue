<script setup>
import Paginator from 'primevue/paginator';


const props = defineProps({
	movieMetaData: Object,
});


const emit = defineEmits(["paginator:action"]);


function emitAction(event){
	event.page++;

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
		@page="emitAction"
	>
	</Paginator>
</template>   


<style scoped>
</style>
