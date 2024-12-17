<script setup>
import {ref, watch} from "vue";
import Rating from 'primevue/rating';
import Textarea from 'primevue/textarea';
import FloatLabel from "primevue/floatlabel";


const props = defineProps({
	movie: Object
});


const emit = defineEmits();


const stars = ref(1);
const comment = ref("");


const ratingActions = {
	closeRating: function(){
		emit("rating:action", {
			action: "close"
		});
	},
	submitRating: function(){
		emit("rating:action", {
			action: "submitRating",
			data: {
				movieId: props.movie.id,
				rating: stars.value,
				comment: comment.value
			}
		});
	}
};


watch(stars, (newVal) => {
	if(!newVal) stars.value = 2;
});
</script>


<template>
	<div class="rating-form">
		<div class="top">
			<Button icon="pi pi-times" severity="secondary" rounded @click="ratingActions.closeRating"></Button>
		</div>

		<div class="mid">
			<span><span style="color: var(--p-primary-color)">Rating movie:</span> {{movie.original_title}}</span>

			<Rating v-model="stars" />

			<FloatLabel variant="on">
				<Textarea id="comment" v-model="comment"></Textarea>
				<label for="comment">Comment</label>
			</FloatLabel>
		</div>

		<div class="bottom">
			<Button label="Submit Rate" @click="ratingActions.submitRating"></Button>
		</div>
	</div>
</template>


<style scoped>
.rating-form {
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 2rem;
	border-radius: 8px;
	padding: 1rem;
	background-color: var(--surface-bg);
	z-index: 1000;
}

.top {
	display: flex;
	justify-content: flex-end;
}

.mid {
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.p-floatlabel {
	height: 100%;
}

textarea {
	width: 100%;
	height: 100%;
}
</style>
