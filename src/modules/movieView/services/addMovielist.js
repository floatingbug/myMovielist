import addMovielistAPI from "@/api/addMovielistAPI.js";


export default async function({movieId, movielistName}){

	const result = await addMovielistAPI({
		movielistName,
		movieId,
	});

	return result.success ? true : false;
}
