import {ref} from "vue";


const movieStoreMovies = ref([]);
const movieStoreCurrMovies = ref([]);
const movieStoreMetaData = ref();
const genreList = ref([]);


export default function useMovieStore(){
	return {movieStoreMovies, movieStoreCurrMovies, movieStoreMetaData, genreList};
}
