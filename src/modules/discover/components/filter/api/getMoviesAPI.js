import apiFetch from "@/api/apiFetch.js";


export default async function getMoviesAPI({query}){
	const path = `/movie${query}`;
	const options = {
		method: "GET",
		headers: {},
	}

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}
