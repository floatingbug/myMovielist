<script setup>
import LatestMovies from "@/components/LatestMovies.vue";
import MovieCarousel from "@/components/MovieCarousel.vue";
import Hero from "./components/Hero.vue";
import About from "./components/About.vue";

</script>


<template>    
	<div class="home-container">
		<Hero class="hero"></Hero>
		
		<section>
			<LatestMovies class="latest-movies"></LatestMovies>
		</section>
		
		<section>
			<About class="about"></About>
		</section>
	</div>
</template>   


<style scoped>
.home-container {
	margin-bottom: 24rem;
}
</style>
