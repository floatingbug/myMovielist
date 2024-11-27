<script setup>
import {onMounted} from "vue";


onMounted(() => {
	const testElement = document.querySelector(".test-element");
	const intersectionArea = document.querySelector(".intersection-area");

	const options = {
		threshold: .5
	}

	const observer = new IntersectionObserver((entries) => {

		entries.forEach(e => console.log(e.isIntersecting));
	});

	observer.observe(testElement);
});


</script>


<template>
	<div class="test-element-container">
		<div class="test-element"></div>
	</div>

	<div class="intersection-area"></div>
</template>


<style scoped>
.test-element-container {
	width: 100%;
	height: 100px;
	position: relative;
}

.test-element {
	width: 50px;
	height: 50px;
	position: absolute;
	background-color: green;
}

.intersection-area {
	width: 100%;
	height: 2000px;
	border: 1px solid red;
}
</style>
