import apiFetch from "@/api/apiFetch.js";


export default async function getLatestMoviesAPI(){
	const path = "/movie/latest-movies";
	const options = {
		method: "GET",
	};

	const result = await apiFetch({path, options});

	return result;
}
