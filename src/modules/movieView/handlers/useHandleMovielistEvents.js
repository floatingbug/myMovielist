import addMovieToMovielist from "../services/addMovieToMovielist.js";
import addMovielist from "../services/addMovielist.js";
import getMovielistsAPI from "@/api/getMovielistsAPI.js";


export default function useMovielistEventHandler({toast, setVisible, updateMovielist}){
	return {
		movieButtonsEvent: async function(event){
			if(event.action === "addMovie"){
				const result = await addMovieToMovielist({
					movielistId: event.data.movielistId,
					movieId: event.data.movieId,
				});

				if(!result){
					toast.add({ severity: 'warn', summary: 'Movie not added.', detail: 'Movie is already in the movielist.', life: 5000 });
					return;
				}
				
				setVisible(false);
				toast.add({ severity: 'info', summary: 'Movie added.', detail: 'Movie has been added.', life: 5000 });
			}
		},

		addMovielistEvent: async function(event){
			if(event.action === "addMovielist"){
				const result = await addMovielist({
					movieId: event.data.movieId,
					movielistName: event.data.movielistName,
				});
				
				if(!result){
					toast.add({ severity: 'warn', summary: 'Movielist not added.', detail: 'Movielist already Exists.', life: 5000 });
					return;
				}
				
				const fetchedMovielists = await getMovielistsAPI();

				updateMovielist(fetchedMovielists.data);
				setVisible(false);
				toast.add({ severity: 'info', summary: 'Movielist added.', detail: 'Movielist has been added.', life: 5000 });
			}
		}
	}
}
