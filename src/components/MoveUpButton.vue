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


const handleActions = {
	moveUp: function(){
		emit("move:action", {
			action: "moveUp",
			target: {
				type: "APP"
			}
		});
	}
}
</script>

<template>
	<Button v-if="isShowingMoveUpButton" class="move-up-button" icon="pi pi-arrow-up" rounded @click="handleActions.moveUp"></Button>
</template>

<style scoped>
</style>

