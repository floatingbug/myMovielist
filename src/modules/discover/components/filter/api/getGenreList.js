import apiFetch from "@/api/apiFetch.js";


export default async function getGenreList(){
	const path = "/movie/get-genre-list";
	const options = {
		method: "GET",
	};

	const result = await apiFetch({
		path,
		options,
	});

	return result.data.genres;
}
