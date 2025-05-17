<script setup>
const props = defineProps({
	label: String,
	url: String,
});

</script>


<template>    
	<Button
		as="router-link"
		:to="url"
		raised
	>
		{{label}}
	</Button>
</template>   


<style scoped>
.p-button {
	text-decoration: none;
}
</style>
