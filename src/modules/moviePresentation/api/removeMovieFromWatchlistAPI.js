import apiFetch from "@/api/apiFetch.js";


export default async function removeMovieFromWatchlistAPI({movieId}){
	const path = "/watchlist/remove-movie";
	const options = {
		method: "DELETE",
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
