import apiFetch from "@/api/apiFetch.js";


export default async function getMoviesAPI({movieIds}){
    const path = `/movie/get-movies-by-ids?movieIds=${movieIds.join(",")}`;
    const options = {
        method: "GET",
		headers: {},
    };

    const result = await apiFetch({path, options, addJwt: true});
    return result;
}
