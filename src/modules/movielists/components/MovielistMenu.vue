<script setup>
import {ref} from "vue";
import TieredMenu from "primevue/tieredmenu";


const props = defineProps({
	isPublic: Boolean,
	movielistId: String,
});


const emit = defineEmits(["movielistMenu:action"]);


const menu = ref(null);
const items = ref([
	{
		label: props.isPublic ? "Set to Private" : "Set to Public",
		command(){
			emit("movielistMenu:action", {
				action: "setPublic",
				isPublic: !props.isPublic,
			});
		}
	},
	{
		label: "Remove Movielist",
		command(){
			emit("movielistMenu:action", {
				action: "removeMovielist",
				movielistId: props.movielistId,
			});
		}
	}
]);


function toggle(event){
	menu.value.toggle(event);
}

</script>


<template>    
	<Button 
		icon="pi pi-ellipsis-v"
		size="small"
		@click="toggle" 
	/>
	<TieredMenu ref="menu" :model="items" popup />
</template>   


<style scoped>
</style>
