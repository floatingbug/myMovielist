import apiFetch from "@/api/apiFetch.js";


export default async function getLatestMovielistsAPI(){
	const path = "/movielist/get-latest-movielists";
	const options = {
		method: "GET",
	};

	const result = await apiFetch({path, options});

	return result;
}
