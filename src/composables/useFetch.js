import {ref} from "vue";


export async function useFetch(url, options = {}){
	const data = ref(null);
	const errors = ref(null);

	try{
		const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, options);
		const fetchedData = await response.json();
		data.value = fetchedData;

		if(!data.value.success) errors.value = data.value.errors;
	}
	catch(error){
		console.log(error);
	}

	return {data, errors};
}
