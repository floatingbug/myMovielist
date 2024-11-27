import {useFetch} from "@/composables/useFetch.js";
import {useUser} from "@/store/useUser.js";


const {getUserSettings} = useUser();
const userSettings = getUserSettings();


export async function handlePage(param){
	const {event, page, token,  movies, metaData, filterQuery} = param;
	page.value = event.page +1;
	
	let path = `/find-movies?language=${userSettings.language}&page=${page.value}&`;
	const options = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	};

	if(filterQuery.value){
		path +=  filterQuery.value;
	}

	const {data, errors} = await useFetch(path, options);

	movies.value = data.value.movies;
	metaData.value = data.value.metaData;
};
