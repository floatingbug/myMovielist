import getMoviesAPI from "@/api/getMoviesAPI.js";


export default async function getMovie({movieId}){
	const query = `movieId=${movieId}`;

	const result = await getMoviesAPI({query});
	result.data.credits.cast.length = 3;

	return result;
}
