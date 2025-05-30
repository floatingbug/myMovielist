export default function createQuery({filterObj}){
	let query = "?";

	// set genrelist
	if(filterObj.genreList && filterObj.genreList.length > 0){
		query += "genres=";
		query += filterObj.genreList.reduce((acc, genre) => {
			acc += genre.id + ","
			return acc;
		}, "");

		query = query.slice(0, -1);
	}

	if(query === "?") query = "";

	return query;
}
