import {ref} from "vue";


const movie = ref();


export default function useMovieStore(){
	return {movie};
}
