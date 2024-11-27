import {useFetch} from "@/composables/useFetch.js"
import {useUser} from "@/store/useUser.js";


const {getUser} = useUser();
const user = getUser();


export async function getMovielists(param){
	const {token} = param;
	const options = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	};

	const {data, errors} = await useFetch("/get-movielists", options);

	user.movielists = data.value.movielists;
}
