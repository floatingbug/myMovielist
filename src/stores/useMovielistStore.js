import {ref} from "vue";


const movielists = ref([]);


export default function useMovielistStore(){
	return {movielists};
}
