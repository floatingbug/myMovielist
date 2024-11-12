import {reactive} from "vue";


const user = reactive({
	name: "",
	email: "",
});

const userSettings = reactive({
	isSignedIn: false,
	isDarkMode: false
});


export function useUser(){
	function setUser({name, email}){
		user.name = name;
		user.email = email;
	}

	function getUser(){
		return user;
	}

	function setUserSettings({isSignedIn, isDarkMode}){
		if(isSignedIn){
			userSettings.isSignedIn = isSignedIn;
		}

		if(isDarkMode){
			userSettings.isDarkMode = isDarkMode;
		}
	}

	function getUserSettings(){
		return userSettings;
	}

	return {getUser, setUser, getUserSettings, setUserSettings}
}
