<script setup>
import {ref, onMounted} from "vue";
import ToggleSwitch from 'primevue/toggleswitch';
import {useUser} from "@/store/useUser.js";


const checked = ref(false);
const {setUserSettings, getUserSettings} = useUser();
const userSettings = getUserSettings();


onMounted(() => {
	if(localStorage.getItem("isDarkMode") === "true" || localStorage.getItem("isDarkMode") === true){
		document.documentElement.className = "dark-mode";
		checked.value = true;
	}
});


function handleToggleSwitch(e){
	if(e){
		document.documentElement.className = "dark-mode";
		localStorage.setItem("isDarkMode", true);
		setUserSettings({isDarkMode: true});
	}
	else{
		document.documentElement.className = "";
		localStorage.setItem("isDarkMode", false);
		setUserSettings({isDarkMode: false});
	}
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
