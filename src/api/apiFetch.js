import useUser from "@/stores/userStore.js";


const {user} = useUser();


export default async function apiFetch({path, options, addJwt = false}){
	if(addJwt){
		options.headers.authorization = user.jwt;
	}

	try{
		const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, options);
		const result = await response.json();

		return result;
	}
	catch(error){
		console.log(error);
	}
}
