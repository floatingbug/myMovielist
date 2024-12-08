import {useFetch} from "@/composables/useFetch.js";

export async function handleSearchInput(param){
	const {input, page} = param;
	const path = `/search-movies?page=${page ? page : ""}&input=${input}`;
	const options = {
		method: "GET"
	};

	const {data, errors} = await useFetch(path, options);

	return {data, errors};
}


