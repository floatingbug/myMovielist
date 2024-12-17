import {useFetch} from "@/composables/useFetch.js";


export async function addRating(param){
	const {movieId, dataType, token,  ...otherProps} = param;

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": token
		},
		body: JSON.stringify({
			movieId,
			dataType,
			...otherProps
		})
	}


	const {data, errors} = await useFetch("/add-customized-data", options);

	return {data, errors};
}
