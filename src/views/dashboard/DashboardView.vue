<script setup>
</script>


<template>    
	<header>
		<h1>Dashboard</h1>
	</header>

	<main>
		<div class="playlists">
			<div class="private-playlists">
				<h1>
					Private playlists
				</h1>
			</div>

			<div class="public-playlists">
				<h1>
					Public playlists
				</h1>
			</div>
		</div>
	</main>
</template>   


<style scoped>
header {
	height: 200px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h1 {
		font-size: 3rem; 
		color: var(--p-primary-color);
	}
}

.playlists {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 3rem;

	.private-playlists, .public-playlists {
		h1 {
			font-size: 2rem;
		}
	}
}
</style>
