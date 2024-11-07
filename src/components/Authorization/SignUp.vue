<script setup>
import {ref, reactive, watch} from "vue";
import {useRouter} from "vue-router";
import InputText from "primevue/inputtext";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import FloatLabel from "primevue/floatlabel";
import {useSignUp} from "./composables/useSignUp.js";
import ProgressSpinner from "../ProgressSpinner.vue";
import CheckBox from "./components/CheckBox.vue";


const errArray = ref([]);
const fields = reactive({
	name: "",
	email: "",
	password: ""
});
const fieldKeys = Object.keys(fields);
const router = useRouter();
const isProgress = ref(false);
const isDisabled = ref(true);
let preveouseFields = JSON.parse(JSON.stringify(fields));



watch(fields, newVal => {
    errArray.value = errArray.value.filter(err => !fieldKeys.includes(err.path[0]) || newVal[err.path[0]] === preveouseFields[err.path[0]]);


	if(errArray.value.find(err => (err.path[0] === "existsAllready"))){
		errArray.value = [];
	}

    preveouseFields = JSON.parse(JSON.stringify(newVal));
});


async function signUp(){
	
	isProgress.value = true;

	const {data, errors} =  await useSignUp(fields);

	isProgress.value = false;

	if(errors.value) return errArray.value = errors.value;

	router.push("/sign-in?signUp=success");
}
</script>


<template>

	<div class="form-container">
		<div class="form-content">
	
			<ProgressSpinner v-if="isProgress" /> 

			<h1>Sign up</h1>

			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-user"></i>
				</InputGroupAddon>

				<FloatLabel variant="on">
					<InputText id="name" v-model="fields.name"></InputText>
					<label for="name">Name</label>
				</FloatLabel>
			</InputGroup>
			
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-envelope"></i>
				</InputGroupAddon>

				<FloatLabel variant="on">
					<InputText id="email" v-model="fields.email"></InputText>
					<label for="email">E-Mail</label>
				</FloatLabel>
			</InputGroup>
			
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-lock"></i>
				</InputGroupAddon>

				<FloatLabel variant="on">
					<InputText id="password" type="password" v-model="fields.password"></InputText>
					<label for="password">Password</label>
				</FloatLabel>
			</InputGroup>

			<div v-if="errArray" class="err-msg" >
				<span v-for="err in errArray">
					<i class="pi pi-exclamation-circle"></i> {{err.message}}
				</span>
			</div>

			<CheckBox @checked="(e) => isDisabled = !e" />

			<Button label="Sign up" @click="signUp" :disabled="isDisabled" />
		</div>
	</div>
</template>


<style scoped>
.form-container {
	width: 100%;
	min-width: 280px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10dvh;
}

.form-content {
	width: 90%;
	max-width: 600px;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
}

.form-content h1 {
	display: inline-block;
}
</style>
