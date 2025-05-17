import {reactive} from "vue";


const user = reactive({
	name: "user",
	jwt: "1",
	isSignedIn: true,
});


export default function useUser(){
	return {user};
}
