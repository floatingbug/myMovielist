import {useFetch} from "@/composables/useFetch.js";
import {useUser} from "@/store/useUser.js";


const {getUser} = useUser();
const user = getUser();


export async function getRatings(){
	const options = {
		method: "GET",
		headers: {
			authorization: user.token
		}
	};

	const {data, errors} = await useFetch("/get-ratings", options);

	return {data, errors};
}
