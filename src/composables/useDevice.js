import {reactive} from "vue";


const device = reactive({
	displaySize: 0,
});


function handleOnResize(){
	device.displaySize = window.innerWidth;
}


window.addEventListener("resize", handleOnResize);


device.displaySize = window.innerWidth;


export default function useDevice(){
	return {device};
}
