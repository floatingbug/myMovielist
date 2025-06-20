import apiFetch from "@/api/apiFetch.js";


export default async function getLatestMoviesAPI(){
	const path = "/movie/latest-movies";
	const options = {
		method: "GET",
		headers: {},
	};

	const result = await apiFetch({path, options, addJwt: true});

	return result;
}
