<script setup>
</script>


<template>    
	<div class="footer">
		<div class="footer-left">
			<h2>Legal</h2>

			<Router-Link to="/legal/imprint">Imprint</Router-Link>
			<Router-Link to="/legal/privacy-policy">Privacy policy</Router-Link>
		</div>

		<div class="footer-right">
			  <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
				  <img src="/logos/tmdb.svg"
					 alt="TMDB Logo" width="100" />
			  </a>
			  <p>
			  	This product uses the TMDB API but is not endorsed or certified by TMDB.
			  </p>

		</div>
	</div>
</template>   


<style scoped>
.footer {
	display: flex;
	justify-content: center;
	gap: 2rem;
	padding: 2rem;
}

.footer-left {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.footer-right {
	display: flex;
	flex-direction: column;
	gap: 1rem;

	p {
		max-width: 300px;
	}
}
</style>
