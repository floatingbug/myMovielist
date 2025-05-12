<script setup>
</script>


<template>    
	<div class="about">
		<h1 class="about__title">Discover & Organize Movies</h1>
		
		<div class="about__section about__section--first">
			<div class="about__card about__card--discover card card--glass">
				<h2>Discover Movies</h2>
				<p>
					Discover movies based on selected criteria like genres.
				</p>
			</div>
		</div>

		<div class="about__section">
			<div class="about__card about__card--movielists card card--glass">
				<h2>Movielists</h2>
				<p>
					Create movie lists and save movies in them. The lists can be set to private or public.
				</p>
			</div>
		</div>
		
		<div class="about__section">
			<div class="about__card about__card--rating card card--glass">
				<h2>Rating</h2>
				<p>
					View ratings and create your own reviews.
				</p>
			</div>
		</div>

		<div class="about__section">
			<div class="about__card about__card--watchlist-seen-status card card--glass">
				<h2>Watchlist / Seen Status</h2>
				<p>
					Users can mark whether they've seen a movie or want to watch it.
				</p>
			</div>
		</div>

		<div class="about__section">
			<div class="about__card about__card--user-statistics card card--glass">
				<h2>User Statistics</h2>

				<ul>
					<li>Total movies watched</li>
					<li>Average rating</li>
					<li>Most watched genres, etc.</li>
				</ul>
			</div>
		</div>
	</div>
</template>   


<style scoped>
.about {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 1rem;
}

.about__title {
	text-align: center;
}

.about__section {
	width: 100%;
	min-height: 10dvh;
	display: flex;
	padding: 1rem 0;
}

.about__section--first {
	margin-top: 5rem;
}

.about__card {
	width: 50%;
	max-width: 400px;
}

.about__card--discover {
	min-width: 200px;
	margin-left: 10%
}

.about__card--movielists{
	margin-left: 60%
}

.about__card--rating {
	margin-left: 30%
}

.about__card--watchlist-seen-status {
	margin-left: 10%;
}

.about__card--user-statistics {
	margin-left: 50%;
}
</style>
