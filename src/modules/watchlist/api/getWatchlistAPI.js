import apiFetch from "@/api/apiFetch.js";


export default async function getWatchlistAPI(){
	const path = "/watchlist/get-watchlist";
	const options = {
		method: "GET",
		headers: {},
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}
