<script setup>
import {ref, watch, toRaw} from "vue";
import Dialog from 'primevue/dialog';


const props = defineProps({
	trigger: Number,
});


const emit = defineEmits(["createMovielist:action"]);


const isVisible = ref(false);
const movielistname = ref("");


watch(() => props.trigger, () => {
	isVisible.value = true;
});


const actions = {
	createMovielist(){
		emit("createMovielist:action", {
			action: "create",
			movielistname: toRaw(movielistname.value),
		});

		isVisible.value = false;
	},
};

</script>


<template>    
	<Dialog
		v-model:visible="isVisible"
	>
		<div class="create-movielist">
			<div class="create-movielist__main">
				<InputGroup>
					<InputGroupAddon>
						<i class="pi pi-list"></i>
					</InputGroupAddon>
			
					<FloatLabel variant="in">
						<InputText v-model="movielistname" />
						<label for="Movielistname">Movielistname</label>
					</FloatLabel>
				</InputGroup>
			</div>
			
			<div class="create-movielist__footer">
				<div class="create-movielist__footer-buttons">
					<Button
						@click="actions.createMovielist"
					>
						Create
					</Button>
			
					<Button
						severity="warn"
						@click="isVisible = false;"
					>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	</Dialog>
</template>   


<style scoped>
.create-movielist {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.create-movielist__footer-buttons {
	display: flex;
	gap: 1rem;
}
</style>
