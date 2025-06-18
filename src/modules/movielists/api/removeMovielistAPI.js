import apiFetch from "@/api/apiFetch.js";


export default async function removeMovielistAPI({movielistId}){
	const path = "/movielist/remove-movielist";
	const options = {
		method: "DELETE",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({movielistId}),
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}
