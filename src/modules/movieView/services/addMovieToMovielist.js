import addMovieToMovielistAPI from "@/api/addMovieToMovielistAPI.js";


export default async function({movielistId, movieId}){
	const result = await addMovieToMovielistAPI({
		movielistId,
		movieId,
	});


	return result.success ? true : false;
}
