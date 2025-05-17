<script setup>
import {ref} from "vue";
import menuItems from "./data/menuItems.js";
import useUser from "@/stores/userStore.js";
import MenuButton from "./components/MenuButton.vue";
import MenuUserList from "./components/MenuUserList.vue";
import useDevice from "@/composables/useDevice.js";


const {user} = useUser();
const {device} = useDevice();
const isMenuOpen = ref(false);


function closeMenu(event){
	if(event.target.dataset.pcName){
		isMenuOpen.value = false;
	}
}

</script>


<template>    
	<nav 
		class="menu"
	>
		<!-- user signed in -->
		<Button
			class="menu__bars-button menu__bars-button--open"
			v-if="device.displaySize < 1024 && !isMenuOpen"
			variant="text"
			@click="isMenuOpen = true;"
		>
			<i class="pi pi-bars"/>
		</Button>

		<div 
			class="menu__content"
			:class="isMenuOpen ? '' : 'menu__content-closed'"
			v-if="user.isSignedIn" 
			@click="closeMenu"
		>

			<div class="menu__head">
				<Button
					class="menu__bars-button"
					v-if="device.displaySize < 1024"
					variant="text"
					@click="isMenuOpen = false;"
				>
					<i class="pi pi-bars"/>
				</Button>
				
				<MenuUserList />
			</div>

			<ul class="menu__items">
				<li class="menu__item"
					v-for="(item, index) in menuItems"
				>
					<MenuButton 
						:url="item.url"
						:label="item.label"
					/>
				</li>
			</ul>
			
		</div>



		<!-- user not signed in -->
		<div 
			class="menu__content"
			v-if="!user.isSignedIn" 
		>
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
	height: auto;
	position: fixed;
	z-index: 1000;
	background-color: var(--navbar-bg);
	backdrop-filter: blur(8px);
}

.menu__content {
	width: 100%;
	height: 100dvh;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0.5rem 1rem;
	background-color: var(--navbar-bg);
	backdrop-filter: blur(8px);
	transition: transform 250ms;
}

.menu__content-closed {
	transform: translateY(-100%);
}

.menu__head {
	width: 100%;
	display: flex;
}

.menu__logo {
	font-size: 1.8rem;
}

.menu__bars-button {
	height: auto;
	position: absolute;
	padding-bottom: 0;
	z-index: 1000;

	i {
		font-size: 1.6rem;
		font-weight: 800;
	}
}

.menu__items {
	width: 90%;
	display: flex;
	flex-direction: column;
	gap: 1.4rem;
	list-style: none;
	margin-top: 4rem;

	a {
		width: 100%;
	}

	.menu__item .p-button {
		padding: 0.2rem 0.5rem;
	}
}

.menu__auth {
	display: flex;
	gap: 1rem;
	margin-left: auto;
}

@media(min-width: 768px) {
	.menu__content {
		width: 50%;
	}
	
	.menu__content-closed {
		transform: translateX(-100%);
	}

	.menu__bars-button--open {
		padding: 1.5rem;

		i {
			font-size: 2rem;
		}
	}
	
	.menu__bars-button {
		i {
			font-size: 2rem;
		}
	}
}

@media(min-width: 1024px) {
	.menu__content {
		width: 100%;
		height: auto;
		flex-direction: row;
	}
	
	.menu__content-closed {
		transform: translateX(0);
	}

	.menu__head {
		order: 2;
	}

	.menu__items {
		flex-direction: row;
		margin: 0;
	}
}
</style>
