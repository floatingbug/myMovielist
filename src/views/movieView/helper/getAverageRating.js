export function getAverageRating(ratings){
	const sum = ratings.value.reduce((accumulator, currentValue) => accumulator + currentValue);

	const averageRating = Math.round((sum / ratings.value.length) * 10) / 10;

	return averageRating;
};
