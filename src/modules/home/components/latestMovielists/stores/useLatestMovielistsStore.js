import {ref} from "vue";


const latestMovielistsStore = ref([]);


export default function useLatestMovielistsStore(){
	return {latestMovielistsStore};
}
