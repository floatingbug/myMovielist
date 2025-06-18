import {reactive} from "vue";


const user = reactive({
	userId: "",
	name: "",
	jwt: "",
	isSignedIn: false,
});


function setUser({userId, name, jwt}){
	user.userId = userId;
	user.name = name;
	user.jwt = jwt;
	user.isSignedIn = true;
}

function unsetUser(){
	user.userId = "";
	user.name = "";
	user.jwt = "";
	user.isSignedIn = false;
}


export default function useUser(){
	return {user, setUser, unsetUser};
}
