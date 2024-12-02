<script setup>
import { ref } from "vue";
import {useRouter} from "vue-router";
import Menu from 'primevue/menu';
import {useUser} from "@/store/useUser.js";


const router = useRouter();
const {getUserSettings, getUser} = useUser();
const userSettings = getUserSettings();
const user = getUser();
const menu = ref();
const items = ref([
    {
        label: user.name,
        items: [
            {
                label: 'Edit Profile',
                icon: 'pi pi-user-edit'
            },
            {
                label: 'My Lists',
                icon: 'pi pi-list',
				command: () => {
					router.push("/movielists")
				}
            },
            {
                label: "Add Movielist",
                icon: "pi pi-list",
                command: () => {
                    router.push("/add-movie-list")
                }
            },
            {
                label: 'Sign Out',
                icon: 'pi pi-upload',
				command: () => {
					userSettings.isSignedIn = false;
					localStorage.removeItem("token");
					localStorage.setItem("isSignedIn", false);
                    router.push("/sign-in");
				}
            }
        ]
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>


<template>
	<Button icon="pi pi-user" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" variant="text" />
	<Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
</template>
