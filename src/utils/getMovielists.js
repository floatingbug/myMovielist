import {useFetch} from "@/composables/useFetch.js"
import {useUser} from "@/store/useUser.js";


const {getUser} = useUser();
const user = getUser();


export async function getMovielists(param){
	const options = {
		method: "GET",
		headers: {
			"Authorization": user.token
		}
	};

	const {data, errors} = await useFetch("/get-movielists", options);

	return {data, errors};
}
