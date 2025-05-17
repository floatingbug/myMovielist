import getRatingsAPI from "@/api/getRatingsAPI.js";


export default async function getRatings({movieId}){
	const result = await getRatingsAPI({movieId});

	return result.data;
}
