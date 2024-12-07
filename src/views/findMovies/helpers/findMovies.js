import {ref} from "vue";
import {useUser} from "@/store/useUser.js";
import {useFetch} from "@/composables/useFetch.js";


const {getUserSettings, getUser} = useUser();
const userSettings = getUserSettings();
const user = getUser();


export async function findMovies(param){
	const {page, query} = param;

	const path = `/discover-movies?language=${userSettings.language}&page=${page}${query ? `&${query}`: ""}`;
	console.log(path);
	const options = {
		method: "GET",
		headers: {
			"Authorization": user.token
		}
	};

	const {data, errors} = await useFetch(path, options);
	
	return {data, errors};
}
