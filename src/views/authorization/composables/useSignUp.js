import {useFetch} from "@/composables/useFetch.js";

export async function useSignUp(fields){
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(fields)
	};
	
	const {data, errors} = await useFetch("/sign-up", options);


	return {data, errors};
}
