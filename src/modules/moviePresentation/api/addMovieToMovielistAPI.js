import apiFetch from "@/api/apiFetch.js";


export default async function addMovieToMovielistAPI({movielistId, movieId}){
	const path = "/movielist/add-movie";
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({movielistId, movieId}),
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}
