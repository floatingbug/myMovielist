<script setup>
import {ref} from "vue";
import NavbarSignedIn from "./components/NavbarSignedIn.vue";
import NavbarSignedOut from "./components/NavbarSignedOut.vue";
import {useUser} from "@/store/useUser.js";

const {getUserSettings, getUser} = useUser();
const userSettings = getUserSettings();
</script>


<template>
	<NavbarSignedIn v-if="userSettings.isSignedIn"></NavbarSignedIn>
	
	<NavbarSignedOut v-if="!userSettings.isSignedIn"></NavbarSignedOut>
</template>


<style scoped>
</style>
