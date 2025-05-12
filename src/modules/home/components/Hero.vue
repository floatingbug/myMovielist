<script setup>
</script>


<template>    
	<div class="hero-container">
		<div class="hero-content">
			<h1>myMovielist</h1>
			
			<div class="intro">
				Discover, save and share your movies.
			</div>
		
			<div class="sign-buttons-container">
				<Button
				>
					Anmelden
				</Button>
				
				<Button
					variant="link"
				>
					Registrieren
				</Button>
			</div>
		</div>
	</div>
</template>   


<style scoped>
.hero-container {
	width: 100%;
	min-height: 100dvh;
	position: relative;
	background-image: url("/public/images/hero_bg.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	z-index: 0;
}

.hero::before {
	content: "";
	width: 100%;
	height: 100%;
	position: absolute;
	backdrop-filter: blur(1px);
	background-color: rgb(0, 0, 0, 0.5);
	z-index: 1;
}

.hero-content {
	width: 100%;
	height: 100dvh;
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 2;
}

.sign-buttons-container {
	display: flex;
	gap: 1rem;
	margin-top: 2rem;
}

.latest-movies {
	width: 90%;
	margin-top: 4rem;
}

@media(min-width: 480px){
	.hero-content {
		h1 {
			font-size: 3rem;
		}

		.intro {
			font-size: 1.2rem;
		}
	}
}

@media(min-width: 768px){
	.hero-content {
		h1 {
			font-size: 4rem;
		}

		.intro {
			font-size: 1.2rem;
		}
	}
}
</style>
