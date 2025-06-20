import apiFetch from "@/api/apiFetch.js";


export default async function getMovieById({movieId}){
	const path = `/movie/get-by-id?movieId=${movieId}`;
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
