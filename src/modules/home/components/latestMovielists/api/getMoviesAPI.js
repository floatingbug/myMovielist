export default async function getMoviesAPI({movieIds}){
    const ids = movieIds.map(m => typeof m === "object" ? m._id : m); // sicherstellen, dass es Strings sind
    const path = `/movie/get-movies-by-ids?movieIds=${ids.join(",")}`;
    const options = {
        method: "GET",
    };

    const result = await apiFetch({path, options});
    return result;
}
