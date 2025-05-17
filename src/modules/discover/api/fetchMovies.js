import fetchMoviesAPI from "@/api/fetchMoviesAPI";


export default async function fetchMovies(){
	const result = await fetchMoviesAPI();

	return result.data;
}
