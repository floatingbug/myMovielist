<script setup>
import {ref} from "vue";
import Rating from "primevue/rating";


const props = defineProps({
	ratings: Array,
});

console.log(props.ratings);

</script>


<template>    
	<ul>
		<li v-for="(rating, index) in ratings">
			<div class="rating">
				<Rating v-model="rating.rating" disabled></Rating>
				<div class="date">{{rating.date}}</div>
				<div class="creator-name">Created by: {{rating.userName}}</div>
				<div class="title">{{rating.title}}</div>
			</div>

			<div class="comment">{{rating.comment}}</div>

			<Divider></Divider>
		</li>
	</ul>
</template>   


<style scoped>
ul {
	list-style: none;
}

.rating {
	display: flex;
	flex-direction: column;
	gap: .2rem;
	padding-top: 1rem;

	.title {
		font-size: 1.2rem;
		margin-top: 1rem;
	}
}

.comment {
	margin-top: 1rem;
	padding-bottom: 1rem;
}
</style>
