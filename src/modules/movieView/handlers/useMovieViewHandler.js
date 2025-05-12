import addRating from "../services/addRating.js";
import getMovie from "../services/getMovie.js";


export default function useMovieViewHandler({toast, movie}){
	return {
		ratingHandler(event){
			handleRating({event, toast, movie})
		}
	};
}


async function handleRating({event, toast, movie}){
	if(event.action === "newRating"){
		const result = await addRating(event.data);

		if(!result){
			toast.add({ severity: 'warn', summary: 'Rating not added.', detail: 'You already rated this movie.', life: 5000 });
			return;
		}
		
		movie.value = await getMovie({movieId: event.data.movieId})
		event.data.newRating.rating = 0;
		event.data.newRating.title = "";
		event.data.newRating.comment = "";
		toast.add({ severity: 'info', summary: 'Movie added.', detail: 'Rating has been added.', life: 5000 });
	}
}
