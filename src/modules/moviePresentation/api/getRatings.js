import apiFetch from "@/api/apiFetch.js";


export default async function getRatings({movieId}){
	const path = `/rating?movieid=${movieId}`;
	const options = {
		method: "GET",
	};

	const result = await apiFetch({
		path,
		options,
	});

	return result.data;
}
