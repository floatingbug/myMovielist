<script setup>
import {ref, onMounted} from "vue";


const isShowingMoveUpButton = ref(false);


const emit = defineEmits();


onMounted(() => {
    const intersectionArea = document.querySelector(".intersecting-area");

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(e => {
			if(e.isIntersecting) isShowingMoveUpButton.value = false;
			else isShowingMoveUpButton.value = true;
		});
	});

	observer.observe(intersectionArea);
});
</script>

<template>
	<div v-if="isShowingMoveUpButton" class="button-content">
		<Button class="move-up-button" icon="pi pi-arrow-up" rounded @click="emit('scrollToTop')"></Button>
	</div>
</template>

<style scoped>
</style>

