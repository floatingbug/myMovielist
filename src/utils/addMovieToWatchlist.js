import {useFetch} from "@/composables/useFetch.js";
import {useUser} from "@/store/useUser.js";


const {getUser} = useUser();
const user = getUser();
const IMG_URL_PREFIX = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"


export async function addMovieToWatchlist({movie}){
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: user.token
		},
		body: JSON.stringify({
			movie: {
				movieId: movie.id,
				title: movie.title,
				description: movie.overview,
				cover: `${IMG_URL_PREFIX}${movie.poster_path}`,
			}
		})
	};

	const {data, errors} = await useFetch("/add-to-watchlist", options);

	return {data, errors};
}
