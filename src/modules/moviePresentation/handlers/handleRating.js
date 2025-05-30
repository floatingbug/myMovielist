import addRating from "../api/addRating.js";


export default async function handleRating(event){
	if(event.action === "newRating"){
		const result = await addRating({rating: event.data.newRating});
		
		return result;
	}
}
