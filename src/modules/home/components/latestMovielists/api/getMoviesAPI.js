import apiFetch from "@/api/apiFetch.js";


export default async function getMoviesAPI({movieIds}){
    const path = `/movie/get-movies-by-ids?movieIds=${movieIds.join(",")}`;
	console.log("path: ", path);
    const options = {
        method: "GET",
    };

    const result = await apiFetch({path, options});
    return result;
}
