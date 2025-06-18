import apiFetch from "@/api/apiFetch";
import useFilterStore from "@/stores/useFilterStore.js";


const filterStore = useFilterStore();


export default async function handlePaginator(event){
	
	if(event.action === "pageChange"){
		const path = `/movie?page=${event.data.page}${filterStore.query.length > 0 ? "&"+filterStore.query : ""}`;
		const options = {
			method: "GET",
			headers: {},
		};

		const result = await apiFetch({path, options, addJwt: true});
		return result.data.results;
	}
}
