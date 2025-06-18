import apiFetch from "@/api/apiFetch.js";


export default async function getMoviesByIdsAPI({movieIds}){
	const movieIdsString = movieIds.reduce((acc, id) => {
		if(acc === "") return acc + id;
		else return acc + "," + id;
	},"");

	const path = `/movie/get-movies-by-ids?movieIds=${movieIdsString}`;
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
