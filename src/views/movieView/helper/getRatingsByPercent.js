export function getRatingsByPercent(ratingsByStars){
	let numberOfRatings = 0;
	let ratingsByPercent = [];

	for(let key in ratingsByStars.value){
		numberOfRatings += ratingsByStars.value[key];
	}

	for(let key in ratingsByStars.value){
		ratingsByPercent.push((ratingsByStars.value[key] / numberOfRatings) * 100);
	}

	return ratingsByPercent;
};
