<script setup>
import {ref, onMounted} from "vue";
import {useFetch} from "@/composables/useFetch.js";


let token = "";


onMounted(async () => {
	const token = localStorage.getItem("token");

	const path = "/find-movies";
	const options = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	};

	const {data, errors} = await useFetch(path, options);

	console.log(data, errors);
});
</script>


<template>
</template>


<style scoped>
</style>
