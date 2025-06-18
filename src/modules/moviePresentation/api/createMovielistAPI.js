import apiFetch from "@/api/apiFetch.js";


export default async function createMovielistAPI({movieId, movielistname}){
	const path = "/movielist/add-movielist";
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({movieId, movielistname}),
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}
