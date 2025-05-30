import {ref} from "vue";


const genreData = ref([
	{
		label: "Comedy",
		id: "comedy",
		isSelected: false,
	},
	{
		label: "Horror",
		id: "horror",
		isSelected: false,
	},
	{
		label: "Science Fiction",
		id: "scienceFiction",
		isSelected: false,
	},
]);


export default genreData;
