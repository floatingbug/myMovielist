import {useUser} from "@/store/useUser.js";
import {useFetch} from "@/composables/useFetch.js";


const {setUser, getUser} = useUser();
const user = getUser();


export async function getMovielists(){
	const options = {
		method: "GET",
		headers: {
			"Authorization": user.token
		}
	};

	const {data, errors} = await useFetch("/get-movielists", options);
	setUser({movielists: data.value.movielists});
}
