<script setup>
import {reactive, toRaw} from "vue";
import Rating from "primevue/rating"


const emit = defineEmits(["createRating:action"]);


const userRating = reactive({
	value: 1,
	title: "",
	comment: "",
});


function emitRating(){
	emit("createRating:action", {
		action: "newRating",
		data: {
			newRating: toRaw(userRating),
		}
	});

	userRating.value = 1;
	userRating.title = "";
	userRating.comment = "";
}

</script>


<template>    
	<div class="create-rating">
		<Rating
			v-model="userRating.value"
		/>

		<InputGroup>
			<InputGroupAddon>
				<i class="pi pi-pencil" />
			</InputGroupAddon>

			<FloatLabel variant="on">
				<InputText v-model="userRating.title" />
				<label for="comment-title">Title</label>
			</FloatLabel>
		</InputGroup>

		<Textarea v-model="userRating.comment" />

		<Button
			@click="emitRating"
		>
			Add Raring
		</Button>
	</div>
</template>   


<style scoped>
.create-rating {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.create-rating :deep(.p-rating-on-icon) {
	color: var(--contrast-color);
}

.p-textarea {
	min-height: 300px;
}
</style>
