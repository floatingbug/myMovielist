<script setup>
import {ref} from "vue";
import Checkbox from 'primevue/checkbox';


const emit = defineEmits(["checked"]);


const checked = ref(false);


function handleCheckbox(e){
	emit("checked", e);
}

</script>


<template>
	<slot name="attributes" :checked="checked">
	</slot>

	<div class="content">
		<Checkbox v-model="checked" binary inputId="accept" @update:modelValue="handleCheckbox" />
		<label for="accept">
			I've read and accept the 
			<Button as="router-link" to="/terms-of-use" variant="text">terms of use</Button>
			and the 
			<Button as="router-link" to="/privacy-policy" variant="text">privacy policy</Button>.
		</label>
	</div>
</template>


<style scoped>
.content {
	display: flex;
	align-items: flex-start;
	gap: 1rem;
}

label {
	.p-button {
		padding: 0;
	}
}
</style>
