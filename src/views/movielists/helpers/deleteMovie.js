import {useUser} from "@/store/useUser.js";
import {useFetch} from "@/composables/useFetch.js";


const {getUser} = useUser();
const user = getUser();


export async function deleteMovie(param){
	const {movielistId, movieId} = param;
	const options = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"Authorization": user.token
		},
		body: JSON.stringify({
			movielistId: movielistId,
			movieIds: [
				movieId
			]
		})
	};

	const {data, errors} = await useFetch("/delete-movies", options);
	return {data, errors};
}
