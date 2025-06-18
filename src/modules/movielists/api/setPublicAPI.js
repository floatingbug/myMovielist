import apiFetch from "@/api/apiFetch.js";


export default async function setPublicAPI({isPublic, movielistId}){
	const path = "/movielist/update-settings";
	const options = {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			movielistId,
			settings: {
				isPublic,
			}
		}),
	};

	const result = await apiFetch({
		path,
		options,
		addJwt: true,
	});

	return result;
}
