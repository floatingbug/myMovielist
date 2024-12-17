<script setup>
import { ref } from 'vue';
import Rating from 'primevue/rating';


const props = defineProps({
    rating: Number
});


const value = ref(props.rating);
</script>


<template>
    <Rating v-model="value" readonly />
</template>
