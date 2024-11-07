<script setup>
import {ref, onMounted} from "vue";
import ToggleSwitch from 'primevue/toggleswitch';


const checked = ref(false);


const emit = defineEmits();
const props = defineProps({
	isDarkMode: Boolean
});


onMounted(() => {
	checked.value = props.isDarkMode;
});


function handleToggleSwitch(e){
	emit("toggleSwitch", e);
}
</script>


<template>
	<ToggleSwitch v-model="checked" @update:modelValue="handleToggleSwitch">
		<template #handle="{ checked }">
			<i :class="{'pi pi-sun': !checked, 'pi pi-moon': checked}" style="font-size: 0.8rem;" />
      	</template>
	</ToggleSwitch>
</template>


<style scoped>
</style>
