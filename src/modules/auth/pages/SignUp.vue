<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import useAuthStore from "../stores/useAuthStore.js";
import signUpAPI from "../api/signUpAPI.js";


const {credentials} = useAuthStore();
const router = useRouter();
const errors = ref([]);


async function signUp(){
	const result = await signUpAPI({
		name: credentials.name,
		email: credentials.email,
		password: credentials.password,
	});

	if(!result.success){
		credentials.name = "";
		credentials.email = "";
		return errors.value = result.errors;
	}

	router.push("/auth/sign-in");
}

</script>


<template>    
	<AuthLayout>
		<template #head>
			<h1>Sign up</h1>
		</template>
		
		<template #form>
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-user"></i>
				</InputGroupAddon>
		
				<FloatLabel>
					<InputText v-model="credentials.name" @input="errors = [];" />
					<label for="name">Name</label>
				</FloatLabel>
			</InputGroup>
			
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-envelope"></i>
				</InputGroupAddon>
		
				<FloatLabel>
					<InputText type="email" v-model="credentials.email" @input="errors = [];" />
					<label for="email">E-Mail</label>
				</FloatLabel>
			</InputGroup>
			
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-lock"></i>
				</InputGroupAddon>
		
				<FloatLabel>
					<InputText type="password" v-model="credentials.password" @input="errors = [];" />
					<label for="password">Password</label>
				</FloatLabel>
			</InputGroup>
		</template>

		<template #text>
			You already have an account? <router-link to="/auth/sign-in">Sign in</router-link>
		</template>

		<template #errors>
			<p v-for="(error, index) in errors" :key="index">
				{{error}}
			</p>
		</template>

		<template #footer-buttons>
			<Button
				@click="signUp"
			>
				Sign in
			</Button>
		</template>
	</AuthLayout>
</template>   


<style scoped>
</style>
