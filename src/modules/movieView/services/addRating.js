import addRatingAPI from "@/api/addRatingAPI.js";


export default async function addRating(payload){
	const result = await addRatingAPI(payload);

	return result.success ? true : false;
}
