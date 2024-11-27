<script setup>
import {ref, reactive, watch} from "vue";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import {useAddMovieList} from "@/components/addMovieList/composables/useAddMovieList.js";


const list = reactive({
	name: "",
	description: "",
	isPublic: true
});
const selectOptions= ref([
	{
		name: "yes",
		isPublic: true
	},
	{
		name: "no",
		isPublic: false
	}
]);
const selected = ref(
	{
		name: "yes",
		isPublic: true
	},
);
const errMsg = ref("");


watch(() => list.name, () => {
	errMsg.value = "";
});


async function createList(){
	if(!list.name){
		return errMsg.value = "List Name is required."
	}

	const {data, error} = await useAddMovieList(list);
	console.log(data, error);
}


</script>


<template>
	<div class="form-container">
		<div class="form-content">
			<FloatLabel>
				<InputText id="name" @value-change="list.name = $event"></InputText>
				<label for="name">List Name</label>
			</FloatLabel>

			<FloatLabel>
				<Textarea id="description" @value-change="list.description = $event"></Textarea>
				<label for="description">Description</label>
			</FloatLabel>
		
			<FloatLabel>
				<Select inputId="over-label" v-model="selected" :options="selectOptions" optionLabel="name" placeholder="Public List?" @update:modelValue="list.isPublic = $event.isPublic"></Select>
				<label for="over-label">Public List?</label>
			</FloatLabel>

			<div class="err-msg">{{errMsg}}</div>

			<Button @click="createList">Create List</Button>
		</div>
	</div>
</template>


<style scoped>
.form-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10dvh;
}

.form-content {
	width: 50%;
	min-width: 280px;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

input, textarea, button, .p-select {
	width: 100%;
}
</style>
