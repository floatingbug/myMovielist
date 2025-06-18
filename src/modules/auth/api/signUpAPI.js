import apiFetch from "@/api/apiFetch.js";


export default async function signUpAPI(payload){
	const path = "/auth/sign-up";
	const options = {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(payload),
	};

	const result = await apiFetch({
		path,
		options,
	});

	return result;
};
