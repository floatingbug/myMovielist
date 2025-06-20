import apiFetch from "@/api/apiFetch.js";


export default async function getLatestMovielistsAPI(){
	const path = "/movielist/get-latest-movielists";
	const options = {
		method: "GET",
		headers: {},
	};

	const result = await apiFetch({path, options, addJwt: true});

	return result;
}
