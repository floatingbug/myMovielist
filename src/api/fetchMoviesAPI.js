import useFetch from "./useFetch.js";


export default async function fetchMoviesAPI(){
	const path = `/movie`;
	const options = {
		method: "GET",
		headers: {},
	};

	const result = await useFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}
