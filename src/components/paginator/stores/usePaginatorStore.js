import {ref} from "vue";


const currPage = ref(0);


export default function usePaginatorStore(){
	return {currPage};
}
