<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import TieredMenu from 'primevue/tieredmenu';
import useUserStore from "@/stores/userStore.js";


const router = useRouter();
const {unsetUser} = useUserStore();
const menu = ref();
const userMenuItems = ref([
	{
		label: "Logout",
		command(){
			localStorage.removeItem("jwt");
			localStorage.setItem("isSignedIn", false);

			unsetUser();
			router.push("/");
		},
	},
]);


function toggle(event){
	menu.value.toggle(event);
}

</script>


<template>    
	<Button 
		class="menu__user-button"
		rounded
		@click="toggle"
	>
		<i 
			class="pi pi-user"
		/>
	</Button>

	<TieredMenu ref="menu" :model="userMenuItems" popup />
</template>   


<style scoped>
.user__button-container {
	padding: 1rem;
}
</style>
