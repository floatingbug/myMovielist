<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import useAuthStore from "../stores/useAuthStore.js";
import signInAPI from "../api/signInAPI.js";
import useUserStore from "@/stores/userStore.js";


const {credentials} = useAuthStore();
const {user, setUser} = useUserStore();
const router = useRouter();
const errors = ref([]);


async function signIn(){
	// sign test users
	if(credentials.nameOrEmail === "user" && credentials.password === "user"){
		setUser({
			userId: "1",
			name: "user",
			jwt: "1",
		});
		
		localStorage.setItem("jwt", user.jwt);
		localStorage.setItem("isSignedIn", true);

		return router.push("/");
	}
	else if(credentials.nameOrEmail === "user2" && credentials.password === "user2"){
		setUser({
			userId: "2",
			name: "user2",
			jwt: "2",
		});
		
		localStorage.setItem("jwt", user.jwt);
		localStorage.setItem("isSignedIn", true);

		return router.push("/");
	}

	console.log("adfasdf");

	// sign normal users
	const result = await signInAPI({
		nameOrEmail: credentials.nameOrEmail,
		password: credentials.password,
	});

	if(!result.success){
		return errors.value = result.errors;
	}

	user.userId = result.data.user.userId;
	user.name = result.data.user.name;
	user.isSignedIn = true;
	user.jwt = result.data.token;

	localStorage.setItem("jwt", user.jwt);
	localStorage.setItem("isSignedIn", true);

	router.push("/");
}
</script>


<template>    
	<AuthLayout>
		<template #head>
			<h1>Sign in</h1>
		</template>

		<template #form>
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-user"></i>
				</InputGroupAddon>
		
				<FloatLabel>
					<InputText v-model="credentials.nameOrEmail" @input="errors = [];" />
					<label for="name">Name or E-Mail</label>
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
			You dont havean an account yet? <router-link to="/auth/sign-up">Sign up</router-link>
		</template>

		<template #errors>
			<p v-if="errors.length > 0" v-for="(error, index) in errors" :key="index">
				{{error}}
			</p>
		</template>

		<template #footer-buttons>
			<Button
				@click="signIn"
			>
				Sign in
			</Button>
		</template>
	</AuthLayout>
</template>   


<style scoped>
</style>
