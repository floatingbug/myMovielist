import {ref} from "vue";


const isProgress = ref(false);

export function useProgress(){
	return isProgress;
}
