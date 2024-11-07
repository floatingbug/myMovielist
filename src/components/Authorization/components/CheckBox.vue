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
			I've read and accept the <a href="/terms-of-use">terms of use</a> and the <a href="/privacy-policy">privacy policy</a>.
		</label>
	</div>
</template>


<style scoped>
.content {
	display: flex;
	gap: 1rem;
}
</style>
