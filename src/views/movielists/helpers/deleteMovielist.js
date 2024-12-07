import {useFetch} from "@/composables/useFetch.js";
import {useUser} from "@/store/useUser.js";


const {getUser} = useUser();
const user = getUser();


export async function deleteMovielist(movielistId){
	const options = {
		method: "DELETE",
		headers: {
			"Authorization": user.token
		}
	};

	const {data, errors} = await useFetch(`/delete-movielist?movielistId=${movielistId}`, options);

	return {data, errors};
}
