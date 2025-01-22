<script setup>
const props = defineProps({
	percent: Number,
	stars: Number
});
</script>


<template>    
	<div class="rating">
		<span>{{stars}} Stars</span>

		<div class="bar-container">
			<div class="bar" :style="{width: `${percent}%`}"></div>
		</div>

		<span>{{percent}}%</span>
	</div>
</template>   


<style scoped>
.rating {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.bar-container {
	width: 200px;
	height: 20px;
	border: 1px solid var(--border-color);
}

.bar {
	height: 100%;
	background-color: var(--p-primary-color);
}
</style>
