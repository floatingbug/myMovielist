export function countRatingsByStars(ratings){
	let countedRatings = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

	ratings.value.forEach(rating => {
		countedRatings[rating]++;
	});

	return countedRatings;
}
