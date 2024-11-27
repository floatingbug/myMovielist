import {reactive} from "vue";


const user = reactive({
	name: "",
	email: "",
	token: "",
	movielists: [],
	topTenList: [],
	watchList: []
});

const userSettings = reactive({
	isSignedIn: false,
	isDarkMode: false,
	language: navigator.language || "en-US",
});


export function useUser(){
	function setUser(param){
		const {name, email, token, movielists} = param;

		if(name) user.name = name;
		if(email) user.email = email;
		if(token) user.token = token;
		if(movielists) user.movielists = movielists;
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
