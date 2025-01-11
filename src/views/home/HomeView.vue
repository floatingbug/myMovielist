<script setup>
</script>


<template>    
	<header>
		<h1>Welcome to <span>myMovielist</span></h1>

		<p>
			On myMovielist you can add movies to your watchlist, discover movies and add them to your movielists, watch movieliests from other users and more.
		</p>

		<div class="sign-buttons">
			<Button as="router-link" to="/sign-in" severity="secondary" outlined>Sign in</Button>
			<Button as="router-link" to="/sign-up" severity="primary">Sign up</Button>
		</div>
	</header>
</template>   


<style scoped>
header {
	height: 600px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	text-align: center;

	h1, p {
		max-width: 800px;
	}

	h1 {
		font-size: 3rem;
	}

	h1 span {
		color: var(--p-primary-color);
	}

	p {
		font-size: 1.3rem;
	}

	.sign-buttons {
		height: 200px;
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	
	.p-button {
		text-decoration: none;
	}
}
</style>
