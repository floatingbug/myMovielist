import useFetch from "./useFetch.js";


export default async function({query}){
	const path = `/movie${query}`;
	const options = {
		method: "GET",
		headers: {},
	};

	const result = await useFetch({path, options, addJwt: true});

	return result;
}
