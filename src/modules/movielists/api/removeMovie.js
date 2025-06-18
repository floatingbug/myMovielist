import apiFetch from "@/api/apiFetch.js";


export default async function removeMovie({movielistId, movieId}){
	const path = "/movielist/remove-movie";
	const options = {
		method: "DELETE",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({movielistId, movieId}),
	};


	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}
