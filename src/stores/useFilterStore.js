import {reactive} from "vue";


const filterStore = reactive({
	query: "",
});


export default function useFilterStore(){
	return filterStore;
}
