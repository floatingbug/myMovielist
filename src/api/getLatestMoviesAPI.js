import useFetch from "./useFetch.js";


export default async function(){
	const path = "/movie/latest-movies";
	const options = {
		method: "GET",
	};

	const result = await useFetch({path, options});

	return result;
}
