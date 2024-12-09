import {useFetch} from "@/composables/useFetch.js";
import {useUser} from "@/store/useUser.js";


const {getUser} = useUser();
const user = getUser();


export async function getPublicLists(){
	const url = "/get-public-movielists";

	const options = {
		method: "GET",
		headers: {
			authorization: user.token
		}
	}

	const {data, errors} = await useFetch(url, options);

	return {data, errors};
}
