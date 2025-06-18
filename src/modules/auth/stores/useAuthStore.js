import {reactive} from "vue";


const credentials = reactive({
	name: "",
	nameOrEmail: "",
	email: "",
	password: "",
});


export default function useAuthStore(){
	return {credentials};
}
