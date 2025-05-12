import useFetch from "./useFetch.js";


export default async function addMovieToWatchlistAPI({movieId}){
	try{
		const path = "/movie/add-to-watchlist";
		const options = {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({movieId}),
		};

		const result = await useFetch({path, options, addJwt: true});
		
		return result.success ? true : false;
	}
	catch(error){
		console.log(error);
	}
}
