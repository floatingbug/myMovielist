<script setup>
import menuItems from "./data/menuItems.js";
import useUser from "@/stores/userStore.js";


const {user} = useUser();

</script>


<template>    
	<nav class="menu">
		<!-- user signed in -->
		<div v-if="user.isSignedIn" class="menu__content">
			<div class="menu__logo">
				myMovielist
			</div>

			<ul class="menu__items">
				<li class="menu__item"
					v-for="(item, index) in menuItems"
				>
					<Button
						as="router-link"
						:to="item.url"
					>
						{{item.label}}
					</Button>
				</li>
			</ul>
			
			<Button>
				<i class="pi pi-user"></i>
			</Button>
		</div>

		<!-- user not signed in -->
		<div v-if="!user.isSignedIn" class="menu__content">
			<div class="menu__logo">
				myMovielist
			</div>

			<div  class="menu__auth">
				<Button 
				>
					Sign in
				</Button>
			
				<Button
				>
					Sign up
				</Button>
			</div>
		</div>
	</nav>
</template>   


<style scoped>
.menu {
	width: 100%;
	position: fixed;
	z-index: 1000;
}

.menu__content {
	display: flex;
	align-items: center;
	padding: 0.5rem 1rem;
	background-color: var(--navbar-bg);
	z-index: 1000;
}

.menu__items {
	display: flex;
	gap: 1rem;
	list-style: none;
	margin-left: auto;
}

.menu__auth {
	display: flex;
	gap: 1rem;
	margin-left: auto;
}
</style>
