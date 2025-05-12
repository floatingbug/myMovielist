import {ref} from "vue";


const movies = ref([]);


export default function useMovies(){
	return {movies};
}
