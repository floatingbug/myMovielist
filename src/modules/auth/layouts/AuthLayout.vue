<script setup>
</script>


<template>    
	<div class="layout">
		<div class="layout__head">
			<slot name="head"></slot>
		</div>

		<div class="layout__form">
			<slot name="form"></slot>
		</div>

		<div class="layout__text">
			<slot name="text"></slot>
		</div>

		<div class="layout__errors">
			<slot name="errors"></slot>
		</div>

		<div class="layout__footer">
			<slot name="footer-buttons"></slot>
		</div>
	</div>
</template>   


<style scoped>


.layout__head {
	margin-top: 3rem;
}

.layout__form {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin-top: 2rem;
}

.layout__text {
	margin-top: 1.5rem;
}

.layout__errors {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	margin-top: 1rem;
	color: var(--p-red-500);
}

.layout__footer {
	margin-top: 4rem;
}
</style>
