import addMovieToWatchlistAPI from "../api/addMovieToWatchlistAPI.js";
import removeMovieFromWatchlistAPI from "../api/removeMovieFromWatchlistAPI.js";


export default async function handleWatchlist(event){
	// add movie to watchlist
	if(event.action === "watchlistChanged" && event.data.isInWatchlist === true){
		const result = await addMovieToWatchlistAPI({
			movieId: event.data.movieId,
		});

		return "movieAdded";
	}

	// remove movie from watchlist
	if(event.action === "watchlistChanged" && event.data.isInWatchlist === false){
		const result = await removeMovieFromWatchlistAPI({
			movieId: event.data.movieId,
		});

		
		return "movieRemoved";
	}
}
