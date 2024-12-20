<script script></script>


<template>
	<div class="footer-content">
		<div class="creator">
			<p>© 2024 Thomas Hof.</p>
			<p>Kontakt: thomas.hof1984@gmail.com</p>
		</div>

		<div class="legal-terms">
			<a href="/mymovielist/terms-of-use">terms of Use</a>
			<a href="/mymovielist/privacy-policy">Privacy Policy</a>
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
	flex-wrap: wrap;
	gap: 1rem;
	padding: 0 2rem;
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
