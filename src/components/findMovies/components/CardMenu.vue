<script setup>
import {ref, computed, onMounted} from "vue";
import {useRouter} from "vue-router";
import TieredMenu from 'primevue/tieredmenu';
import {useUser} from "@/store/useUser.js";
import {addToMovielist} from "../helpers/addToMovielist.js";
import {useToast} from "primevue/usetoast";


const props = defineProps({
	movie: Object,
	movielist: Object 
});


const emit = defineEmits(["menu:action"]);


const toast = useToast();
const {getUser} = useUser();
const user = getUser();
const router = useRouter();
const menu = ref();
const movielists = user.movielists?.map(list => ({
	label: list.name,
	command: addMovie(list)
})) || [];
const items = ref([
	{
		label: 'Lists',
		icon: 'pi pi-list',
		items: [
			{
				label: "Create new list",
				command: () => {
					router.push("/add-movie-list");
				}
			},
			{
				label: "Add to your lists",
				items: [
					...movielists
				]
			}
		]
	},
	{
		label: 'Add to watchlist',
		icon: 'pi pi-bookmark-fill'
	},
	{
		label: 'Add rating',
		icon: 'pi pi-star-fill'
	},
]);


function addMovie(list){
	return async () => {
		console.log(list);
		emit("menu:action", {
			action: "processing",
			isProcessing: true
		});

		const data = await addToMovielist({movie: props.movie, movielist: list});
		if(data.value.success) toast.add({ severity: 'contrast', summary: 'Movie Added', detail: data.value.msg, life: 3000 });
		else toast.add({ severity: 'contrast', summary: 'Movie not added', detail: data.value.msg, life: 3000 });

		emit("menu:action", {
			action: "processing",
			isProcessing: false
		});
	};
}


const toggle = (event) => {
    menu.value.toggle(event);
};
</script>


<template>
	<Button icon="pi pi-ellipsis-v" severity="secondary" rounded @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu" />
	<TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
</template>


<style scoped>
</style>
