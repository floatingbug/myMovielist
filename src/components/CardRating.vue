<script setup>
import { ref, watch } from 'vue';
import Rating from 'primevue/rating';


const props = defineProps({
    rating: Number
});


watch(() => props.rating, (newVal) => {
    value.value = newVal;
});


const value = ref(props.rating);
</script>


<template>
    <Rating v-model="value" readonly />
</template>
