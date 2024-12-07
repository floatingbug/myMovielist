<script setup>
import ProgressSpinner from 'primevue/progressspinner';

</script>


<template>
	<div class="progress-spinner-container">
		<ProgressSpinner />
	</div>
</template>


<style scoped>
.progress-spinner-container {
	width: 100%;
	height: 100dvh;
	position: fixed;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--progress-spinner-bg);
	z-index: 999;
}

.p-progressspinner {
	width: 50%;
	left: 0;
	top: 0;
	z-index: 1000;
	border-radius: 8px;
}
</style>
