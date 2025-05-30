<script setup>
import {ref} from "vue";
import TieredMenu from 'primevue/tieredmenu';
import movielistItems from "./data/movielistItems.js";


const menu = ref(null);


function toggle(event){
	menu.value.toggle(event);
}

</script>


<template>    
	<Button @click="toggle">
		Add to Movielist
	</Button>
	<TieredMenu ref="menu" id="overlay_tmenu" :model="movielistItems" popup />
</template>   


<style scoped>
</style>
