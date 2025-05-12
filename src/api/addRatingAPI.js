import useFetch from "./useFetch.js";


export default async function addRatingAPI(payload){
	const path = "/rating";
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(payload),
	}

	const result = await useFetch({path, options, addJwt: true});

	return result;
}
