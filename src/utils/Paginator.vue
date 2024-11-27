<script setup>
import Paginator from 'primevue/paginator';


const emit = defineEmits(["pageChange"]);

defineProps({
	rows: Number,
	totalRecords: Number,
	rowsPerPageOptions: Array
});
</script>


<template>
   	<Paginator :rows="rows" :totalRecords="totalRecords" :rowsPerPageOptions="rowsPerPageOptions" @page="emit('pageChange', $event)"></Paginator>
</template>



