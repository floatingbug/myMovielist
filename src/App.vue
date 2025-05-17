<script setup>
import {onMounted} from "vue";
import { RouterView, useRouter } from 'vue-router'
import Toast from 'primevue/toast';
import TheMenu from "./components/menu/TheMenu.vue";


const router = useRouter();


onMounted(() => {
});

</script>

<template>
	<Toast />
	<TheMenu></TheMenu>

  <RouterView />
</template>

<style scoped>
</style>
