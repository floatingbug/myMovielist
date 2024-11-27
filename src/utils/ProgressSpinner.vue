<script setup>
import ProgressSpinner from 'primevue/progressspinner';

</script>


<template>
	<ProgressSpinner />
</template>


<style scoped>
.p-progressspinner {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1000;
	border-radius: 8px;
	background-color: rgb(from var(--p-surface-500) r g b / 50%);
	backdrop-filter: blur(8px);
}
</style>
