import useFetch from "./useFetch.js";


export default async function getRatingsAPI({movieId}){
	const path = `/rating?movieid=${movieId}`;
	const options = {
		method: "GET",
	};

	const result = await useFetch({
		path,
		options,
	});

	return result;
}
