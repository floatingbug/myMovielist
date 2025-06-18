import apiFetch from "./apiFetch.js";


export default async function apiGetUserByJWT({jwt}){
	const path = "/user/get-user";
	const options = {
		method: "GET",
		headers: {
			authorization: jwt,
		}
	};

	const result = await apiFetch({
		path,
		options,
	});

	return result;
}
