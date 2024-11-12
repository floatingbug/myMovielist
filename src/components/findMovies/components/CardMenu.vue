<script setup>
import { ref } from "vue";
import Menu from 'primevue/menu';


const menu = ref();
const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'Add to list',
                icon: 'pi pi-list'
            },
            {
                label: 'Add to watchlist',
                icon: 'pi pi-bookmark-fill'
            },
            {
                label: 'Add ranking',
                icon: 'pi pi-star-fill'
            },
        ]
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>


<template>
    <div class="card flex justify-center">
        <Button icon="pi pi-ellipsis-v" severity="secondary" rounded @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
</template>

