<script setup>
import {ref, reactive, onMounted, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import InputText from "primevue/inputtext";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import FloatLabel from "primevue/floatlabel";
import ProgressSpinner from  "../ProgressSpinner.vue";
import {useSignIn} from "./composables/useSignIn.js";
import {useUser} from "@/store/useUser.js";

const route = useRoute();
const isSignUpSuccess = ref(false);
const errArray = ref([]);
const fields = reactive({
	nameOrMail: "",
	password: ""
});
const fieldKeys = Object.keys(fields);
const router = useRouter();
const isProgress = ref(false);
const {setUser, setUserSettings} = useUser();
let preveouseFields = JSON.parse(JSON.stringify(fields));


onMounted(() => {
	isSignUpSuccess.value = route.query.signUp ? true: false;
});


watch(fields, newVal => {
    errArray.value = [];
});


async function signIn(){
	isProgress.value = true;

	const {data, errors} =  await useSignIn(fields);

	isProgress.value = false;

	if(errors.value) return errArray.value = errors.value;

	setUser({name: data.value.user.name, email: data.value.user.email, isSignedIn: true});
	setUserSettings({isSignedIn: true});
	localStorage.setItem("token", data.value.token);
	localStorage.setItem("isSignedIn", true);

	router.push("/find-movies");
}
</script>


<template>
	<div class="form-container">
		<div class="form-content">
			<ProgressSpinner v-if="isProgress" />

			<h1 v-if="isSignUpSuccess">Sign up was successfull. Please sign in.</h1>

			<h1 v-else>Sign in</h1>

			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-user"></i>
				</InputGroupAddon>

				<FloatLabel variant="on">
					<InputText id="nameOrMail" v-model="fields.nameOrMail"></InputText>
					<label for="nameOrMail">Name or E-Mail</label>
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

			<Button label="Sign in" @click="signIn" />
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
