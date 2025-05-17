<script setup>
import {ref} from "vue";
import Rating from "primevue/rating";


const value = ref(4);

</script>


<template>    
	<Rating
		v-model="value"
		readonly
	/>
</template>   


<style scoped>
</style>
