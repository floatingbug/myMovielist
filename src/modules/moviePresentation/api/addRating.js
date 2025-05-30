import apiFetch from "@/api/apiFetch.js";
import useMovieStore from "../stores/movieStore.js";


const {movie} = useMovieStore();


export default async function addRating({rating}){
	const path = `/rating/add-rating`;
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			movieId: movie.value.id,
			rating,
		}),
	};

	const result = await apiFetch({path, options, addJwt: true});

	return result;
}
