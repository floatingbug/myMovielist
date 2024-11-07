import {ref} from "vue";
import {useFetch} from "@/composables/useFetch.js";

export async function useSignIn(fields){
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(fields)
	};

	const {data, errors} = await useFetch("/sign-in", options);


	return {data, errors};
}
