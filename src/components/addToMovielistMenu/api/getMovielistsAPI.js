import apiFetch from "@/api/apiFetch.js";


export default async function getMovielistsAPI(){
	const path = "/movielist/get-movielists";
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
