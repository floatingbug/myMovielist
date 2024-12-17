export function determineAverageRating(movies){
	movies.value.forEach(movie => {
		let ratingCount = 0;
		let ratingSum = 0;

		if(!movie.customizedData) return;

		for(let i = 0; i < movie.customizedData.length; i++){
			ratingCount++;
			ratingSum += movie.customizedData[i].rating;
		}

		movie.averageRating = ratingSum / ratingCount;
	});
}
