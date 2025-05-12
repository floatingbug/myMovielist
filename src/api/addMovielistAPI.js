import useFetch from "./useFetch.js";


export default async function({movielistName, movieId}){
	const path = "/movie/add-movielist";
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			movielistName,
			movieId,
		}),
	};

	const result = await useFetch({path, options, addJwt: true});

	return result;
}
