import {reactive} from "vue";


const user = reactive({
	name: "test_user",
	isSignedIn: true,
	jwt: "1",
});


export default function(){
	return {user};
}
