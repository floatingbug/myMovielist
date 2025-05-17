import {ref} from "vue";


const movieStoreMovies = ref([]);
const movieStoreMetaData = ref();


export default function useMovieStore(){
	return {movieStoreMovies, movieStoreMetaData};
}
