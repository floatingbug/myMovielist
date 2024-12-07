export default function createQueryString(param){
	const {genreButtons} = param;
	let queryString = "";

	// filter for genre (check which genreButton is active and store its id)
	const genreIds = genreButtons.value.
		filter(button => button.isButtonActive).
		map(button => button.id);

	//add genres to queryString
	if(genreIds.length > 0){
		queryString += `with_genres=${genreIds}&`;
	}

	queryString = queryString.slice(0, -1);

	return queryString;
}
