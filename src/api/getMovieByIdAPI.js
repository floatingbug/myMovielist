import useFetch from "./useFetch.js";


export default async function getMovieByIdAPI({movieId}){
	const path = `/movie/get-by-id?movieId=${movieId}`;
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
