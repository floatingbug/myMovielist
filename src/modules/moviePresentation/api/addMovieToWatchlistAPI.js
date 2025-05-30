import apiFetch from "@/api/apiFetch.js";


export default async function addMovieToWatchlistAPI({movieId}){
	const path = "/watchlist/add-movie";
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({movieId}),
	};


	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}
