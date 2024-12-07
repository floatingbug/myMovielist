<script setup>
import { ref } from "vue";
import Menu from 'primevue/menu';


const props = defineProps({
	items: Array
});


const menu = ref();
const items = props.items;

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>

<template>
    <div class="card flex justify-center">
        <Button icon="pi pi-ellipsis-v" severity="secondary" text @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
</template>

