export function getAverageRating(ratings){
	const sum = ratings.value.reduce((accumulator, currentValue) => accumulator + currentValue);

	const averageRating = sum / ratings.value.length;

	return averageRating;
};
