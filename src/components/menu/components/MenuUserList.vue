<script setup>
import {ref} from "vue";
import TieredMenu from 'primevue/tieredmenu';
import userMenuItems from "../data/userMenuItems.js";


const menu = ref();


function toggle(event){
	menu.value.toggle(event);
}

</script>


<template>    
	<Button 
		class="menu__user-button"
		rounded
		@click="toggle"
	>
		<i 
			class="pi pi-user"
			style="font-size: 1.2rem;"
		/>
	</Button>

	<TieredMenu ref="menu" :model="userMenuItems" popup />
</template>   


<style scoped>
.menu__user-button {
	margin-left: auto;
	background-color: var(--contrast-color);
}
</style>
