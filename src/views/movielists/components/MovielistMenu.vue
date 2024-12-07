<script setup>
import { ref } from "vue";
import Menu from "primevue/menu";


const props = defineProps({
    movielistId: String
});


const emit = defineEmits(["menu:action"]);


const menu = ref();
const menuActions = {
    deleteMenulist: function(){
        emit("menu:action", {
            action: "delete",
            target: {
                type: "movielist",
                movielistId: props.movielistId
            }
        });
    }
};
const items = ref([
    {
        label: 'Movielist Menu',
        items: [
            {
                label: 'Delete Movielist',
                icon: 'pi pi-delete-left',
                command: menuActions.deleteMenulist
            }
        ]
    }
]);


const toggle = (event) => {
    menu.value.toggle(event);
};
</script>


<template>
	<div class="movielist-menu-container">
	    <Button icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" severity="secondary" text />
	    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
	</div>
</template>


<style scoped>
</style>
