<script setup>
import {ref, onMounted, toRaw, watch} from "vue";
import Chip from "primevue/chip";


const props = defineProps({
	movie: Object,
});


const emit = defineEmits(["addToWatchlistButton:action"]);


const isInWatchlist = ref(null);
const isInProgress = ref(false);


onMounted(() => {
	isInWatchlist.value = props.movie.isInWatchlist;
});


function emitEvent(){
	isInProgress.value = true;
	isInWatchlist.value = !isInWatchlist.value;

	emit("addToWatchlistButton:action", {
		action: "watchlistChanged",
		data: {
			isInWatchlist: toRaw(isInWatchlist.value),
			movieId: props.movie.id,
		}
	});
}

watch(() => props.movie.isInWatchlist, () => {
	isInProgress.value = false;
});

</script>


<template>    
	<div class="watchlist-button__wrapper">
		<div 
			class="watchlist-button__wrapper-spinner"
			:class="{
				'watchlist-button__in-progress': isInProgress,
			}"
		>
		</div>

		<Chip 
			class="watchlist-button"
			:class="{
				'watchlist-button__is-in-watchlist': movie.isInWatchlist,
			}"
			@click="emitEvent"
		>
			<span v-if="!movie.isInWatchlist">Add to Watchlist</span>
			<span v-else>Remove from Watchlist</span>
		</Chip>
	</div>
</template>   


<style scoped>
.p-chip {
	user-select: none;
	cursor: pointer;
}

.watchlist-button__wrapper {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 16px;
	overflow: hidden;
}

.watchlist-button {
	width: 95%;
	height: 90%;
	transition: background-color 1ms;

	span {
		text-align: center;
	}
}

.watchlist-button__is-in-watchlist {
	color: var(--text-color-dark);
	background-color: var(--contrast-color);
}

.watchlist-button__in-progress {
}

.watchlist-button__in-progress.watchlist-button__wrapper-spinner {
    pointer-events: none;
    position: relative;
	width: 200px;
	height: 200px;
	position: absolute;
	animation: spin 1000ms linear infinite;
	background: linear-gradient(180deg, var(--p-primary-color), var(--p-yellow-500));
	z-index: -1;
}

@keyframes spin {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
