import {useUser} from "@/store/useUser.js";
import {useFetch} from "@/composables/useFetch.js";


const {getUserSettings} = useUser();
const userSettings = getUserSettings();


export async function handleFilter(param){
	const {event, token,  page, movies, metaData, filterQuery} = param;
	filterQuery.value = event;
	page.value = 1;

	const path = `/discover-movies?language=${userSettings.language}&page=${page.value}&${filterQuery.value}`;
	const options = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	};

	const {data, errors} = await useFetch(path, options);

	movies.value = data.value.movies;
	metaData.value = data.value.metaData;
	metaData.value.totalResults = metaData.value.totalResults > 499 ? 499 : metaData.value.totalResults;
}
