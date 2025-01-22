export function getRatingsByPercent(ratingsByStars){
	let numberOfRatings = 0;
	let ratingsByPercent = [];

	for(let key in ratingsByStars.value){
		numberOfRatings += ratingsByStars.value[key];
	}

	for(let key in ratingsByStars.value){
		ratingsByPercent.push(Math.round(((ratingsByStars.value[key] / numberOfRatings) * 100) * 10) / 10);
	}

	return ratingsByPercent;
};
