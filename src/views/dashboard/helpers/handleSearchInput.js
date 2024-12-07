import {useFetch} from "@/composables/useFetch.js";

export async function handleSearchInput(param){
	const {input} = param;
	const path = `/search-movies?page=1&input=${input}`;
	const options = {
		method: "GET"
	};

	const {data, errors} = await useFetch(path, options);

	return {data, errors};
}


