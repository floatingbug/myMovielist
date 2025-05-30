import apiFetch from "@/api/apiFetch.js";


export default async function fetchMovies(){
	const path = `/movie`;
	const options = {
		method: "GET",
		headers: {},
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result.data;
}
