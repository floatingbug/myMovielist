<script setup>
import {ref, computed, onMounted} from "vue";
import {useRouter} from "vue-router";
import TieredMenu from 'primevue/tieredmenu';
import {useUser} from "@/store/useUser.js";
import {addToMovielist} from "@/utils/addToMovielist.js";
import {useToast} from "primevue/usetoast";


const props = defineProps({
	movie: Object,
	movielists: Array
});


const emit = defineEmits(["cardMenu:action"]);


const toast = useToast();
const {getUser} = useUser();
const user = getUser();
const router = useRouter();
const menu = ref();

const menuActions = {
	addMovieToMovielist: function(movielist){
		return () => {
			emit("cardMenu:action", {
				action: "addMovieToMovielist",
				target: {
					type: "findMovies"
				},
				data: {
					movielist: movielist,
					movie: props.movie
				}
			});
		}
	},
	addRating: function() {
		emit("cardMenu:action", {
			action: "addRating",
			data: {
				movieId: props.movie.id
			}
		});
	}
};

const adjustedMovielists = props.movielists?.map(movielist => ({
	label: movielist.name,
	command: menuActions.addMovieToMovielist(movielist)
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
					...adjustedMovielists
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
		icon: 'pi pi-star-fill',
		command: menuActions.addRating
	},
]);


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
