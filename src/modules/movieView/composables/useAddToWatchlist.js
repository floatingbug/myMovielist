import addMovieToWatchlistAPI from "@/api/addMovieToWatchlistAPI.js";


export default function useAddToWatchlist({toast}){
	return async ({movieId}) => {
		const result = await addMovieToWatchlistAPI({movieId});

		if(!result){
			toast.add({ severity: 'warn', summary: 'Movie not added.', detail: 'Movie is already in the watchlist.', life: 5000 });
			return;
		}
		
		toast.add({ severity: 'info', summary: 'Movie added.', detail: 'Movie has been added.', life: 5000 });
	}
}
