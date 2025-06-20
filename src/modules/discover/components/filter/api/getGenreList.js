import apiFetch from "@/api/apiFetch.js";


export default async function getGenreList(){
	const path = "/movie/get-genre-list";
	const options = {
		method: "GET",
		headers: {},
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result.data.genres;
}
