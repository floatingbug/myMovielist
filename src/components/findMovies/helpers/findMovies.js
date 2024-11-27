import {ref} from "vue";
import {useUser} from "@/store/useUser.js";
import {useFetch} from "@/composables/useFetch.js";


const {getUserSettings} = useUser();
const userSettings = getUserSettings();


export async function findMovies(param){
	const {token, page, movies, metaData, genreList} = param;
	const path = `/find-movies?language=${userSettings.language}&page=${page.value}`;
	const options = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	};

	const {data, errors} = await useFetch(path, options);
	movies.value = data.value.movies;
	metaData.value = data.value.metaData;
	genreList.value = data.value.genreList.genres;

	return {movies, genreList, metaData};
}
