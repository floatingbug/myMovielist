import getMoviesAPI from "@/api/getMoviesAPI.js";


export default async function getMovies(){
	const query = "";

	const result = await getMoviesAPI({query});

	return result;
}
