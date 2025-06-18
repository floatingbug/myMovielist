import apiFetch from "@/api/apiFetch.js";


export default async function findMoviesByNameAPI({name}){
	const path = `/movie/get-movies-by-person?name=${name}`;
	const options = {
		method: "GET",
	};

	const result = await apiFetch({
		path,
		options,
	});

	return result;
}
