import {useFetch} from "@/composables/useFetch.js";
import {useUser} from "@/store/useUser.js";


const {getUser} = useUser();
const user = getUser();


export async function useAddMovieList(list){
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": user.token
		},
		body: JSON.stringify(list)
	};

	const {data, error} = await useFetch("/add-movie-list", options);

	return {data, error};
}
