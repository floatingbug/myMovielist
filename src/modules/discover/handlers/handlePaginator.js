import apiFetch from "@/api/apiFetch";


export default async function handlePaginator(event){
	if(event.action === "pageChange"){
		const path = `/movie?page=${event.data.page}`;
		const options = {
			method: "GET",
			headers: {},
		};

		const result = await apiFetch({path, options, addJwt: true});
		return result.data.results;
	}
}
