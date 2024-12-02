<script script></script>


<template>
	<div class="footer-content">
		<div class="creator">
			<p>© 2024 Max Mustermann.</p>
			<p>Kontakt: support@example.com</p>
		</div>

		<div class="legal-terms">
			<a href="/terms-of-use">terms of Use</a>
			<a href="/privacy-policy">Privacy Policy</a>
		</div>
		
    	<div class="tmdb">
			<img src="./assets/tmdb.svg" alt="">

    		<p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
    	</div>
	</div>
</template>


<style scoped>
.footer-content {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	padding: 4rem 0;
}

.creator {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.legal-terms {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.tmdb {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.tmdb img {
	width: 100px;
	margin-left: auto;
}
</style>
