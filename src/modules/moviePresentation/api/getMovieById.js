import getMovieByIdAPI from "@/api/getMovieByIdAPI.js";


export default async function getMovieById({movieId}){
	const result = await getMovieByIdAPI({movieId});

	return result.data;
}
