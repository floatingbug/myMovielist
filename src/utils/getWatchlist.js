import {useUser} from "@/store/useUser.js";
import {useFetch} from "@/composables/useFetch.js";


const {getUser} = useUser();
const user = getUser();


export async function getWatchlist(){
	const options = {
		method: "GET",
		headers: {
			authorization: user.token
		}
	};

	const {data, errors} = await useFetch("/get-watchlist", options);
	
	return {data, errors};
}
