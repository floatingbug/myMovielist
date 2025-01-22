<script setup>
import {ref} from "vue";
import Panel from "primevue/panel";
import MovieCard from "./MovieCard.vue";


const isCollapsed = ref(true);


const props = defineProps({
	watchlist: Array
});


console.log(props.watchlist);
</script>


<template>    
	<Panel class="list" :collapsed="isCollapsed" toggleable>
		<template #header>
			<div class="panel-header-left">
				<span>
					Watchlist
				</span>
			</div>
		</template>

				
		<div class="watchlist-container">
				<MovieCard v-for="(movie, index) in watchlist" :movie="movie"></MovieCard>
		</div>
	</Panel>
</template>   


<style scoped>
.watchlist-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 1rem;
}

.p-panel {
	width: 100%;
}

:deep(.p-panel-content) {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
}
</style>
