import useFetch from "./useFetch.js";


export default async function({movieId, movielistId}){
	const path = "/movie/add-to-movielist";
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({movieId, movielistId}),
	};

	const result = await useFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}
