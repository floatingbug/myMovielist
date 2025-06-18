<script setup>
import {ref, watch} from "vue";
import Movies from "./Movies.vue";
import MovielistMenu from "./MovielistMenu.vue";
import setPublicAPI from "../api/setPublicAPI.js";
import Tag from 'primevue/tag';
import useUser from "@/stores/userStore.js";
import useMovielistStore from "@/stores/useMovielistStore.js";


const props = defineProps({
	movielist: Object,
	listNumber: Number,
	listId: Number,
});


const emit = defineEmits(["movielist:action"]);


const {user} = useUser();
const {movielists} = useMovielistStore();
const isListOpen = ref(null);
const isOwnMovielist = user.userId === props.movielist.userId ? true : false;
console.log(props.movielist);


watch(() => props.listNumber, () => {
	if(props.listNumber === props.listId){
		isListOpen.value = true;
	}
	else{
		isListOpen.value = false;
	}
});


function emitCloseList(event){
	emit("movielist:action", {
		action: "close",
		listId: props.listId,
	});

	event.stopPropagation();
}

async function onMovielistMenuAction(event){
	if(event.action === "setPublic"){
		const result = await setPublicAPI({
			isPublic: event.isPublic,
			movielistId: props.movielist.movielistId,
		});

		movielists.value.forEach(movielist => {
			if(movielist.movielistId === props.movielist.movielistId){
				movielist.isPublic = event.isPublic;
			}
		});
	}
	else if(event.action === "removeMovielist"){
		emit("movielist:action", {
			action: "removeMovielist",
			movielistId: event.movielistId,
		});
	}
}

</script>


<template>    
	<div class="movielist">
		<Tag 
			class="movielist__head-is-public-tag"
			v-if="user.userId === movielist.userId"
			:severity="movielist.isPublic ? 'success' : 'warn'"
			:value="movielist.isPublic ? 'public' : 'private'" 
		/>
		<Tag
			v-else
			:value="'List by: ' + movielist.creatorName"
		/>

		<div class="movielist__head">
			<div class="movielist__head-menu" v-if="isListOpen">
				<MovielistMenu 
					v-if="user.userId === movielist.userId"
					:isPublic="movielist.isPublic"
					:movielistId="movielist.movielistId"
					@movielistMenu:action="onMovielistMenuAction"
				/>
				
				<div class="movielist__head-close" v-if="isListOpen">
					<Button
						icon="pi pi-times"
						size="small"
						severity="warn"
						rounded
						@click="emitCloseList"
					/>
				</div>
			</div>

			<div class="movielist__head-items">
				<div class="movielist__head-creator">
					<span>Creator: </span>{{movielist.creatorName}}
				</div>
				
				<div class="movielist__head-title">
					<span>Title: </span>{{movielist.movielistname}}
				</div>
			</div>
		</div>

		<div class="movielist__main" :class="{'movielist__main-open': isListOpen}">
			<Movies :movieIds="movielist.movies" :movielistId="movielist.movielistId" :isOwnMovielist="isOwnMovielist" />
		</div>
	</div>
</template>   


<style scoped>
.movielist__head {
	width: 100%;
	display: flex;
	flex-direction: column;
	border-radius: 8px 8px 0 0;
	padding: 1rem;
	border-bottom: 1px solid var(--head-gb-glass);
	cursor: pointer;
	user-select: none;
	background-color: var(--table-head-bg-glass);
}

.movielist__head-menu {
	display: flex;
	justify-content: space-between;
}

.movielist__head-items {
	display: flex;
	margin-top: 1rem;
}

.movielist__head-creator, .movielist__head-title {
	width: 50%;
	display: flex;
	align-items: center;
	gap: 0.5rem;

	:first-child {
		color: var(--contrast-color);
	}
}

.movielist__main {
	height: 0;
	overflow: hidden;
	transition: height 250ms;
}

.movielist__main-open.movielist__main {
	height: 100%;
}
</style>
