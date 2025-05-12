import useFetch from "./useFetch.js";


export default async function(){
	const path = "/movie/get-movielists";
	const options = {
		method: "GET",
		headers: {},
	};

	const result = await useFetch({path, options, addJwt: true});
	return result;
}
