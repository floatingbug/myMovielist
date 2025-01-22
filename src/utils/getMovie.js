import {useFetch} from "@/composables/useFetch.js";


export async function getMovie(movieId){
	try{
		const options = {
			method: "GET",
		}

		const {data, errors} = await useFetch(`/get-movie?movieId=${movieId}`, options);

		return {data, errors};
	}
	catch(error){
		console.log(error);
	}

}
