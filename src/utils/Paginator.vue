<script setup>
import Paginator from 'primevue/paginator';


const emit = defineEmits(["pageChange"]);


const props = defineProps({
	rows: Number,
	totalRecords: Number,
	rowsPerPageOptions: Array
});
</script>


<template>
   	<Paginator :rows="rows" :totalRecords="props.totalRecords" :rowsPerPageOptions="props.rowsPerPageOptions" @page="emit('pageChange', $event)"></Paginator>
</template>



