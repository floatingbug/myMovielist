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
		/>
	</Button>

	<TieredMenu ref="menu" :model="userMenuItems" popup />
</template>   


<style scoped>
.user__button-container {
	padding: 1rem;
}
</style>
