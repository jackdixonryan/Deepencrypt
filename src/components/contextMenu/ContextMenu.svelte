<script lang="ts">
	import { getMenuOptions } from "./menu";

	import Menu from "./Menu.svelte";	
	import MenuOption from "./MenuOption.svelte";

	export let context = { resources: [], user: null, page: null };
	
	let pos = { x: 0, y: 0 };
	let showMenu: boolean = false;
	let menuData;
	
	async function onRightClick(e) {
		if (showMenu) {
			showMenu = false;
			await new Promise(res => setTimeout(res, 100));
		}
		
		pos = { x: e.clientX, y: e.clientY };
		menuData = getMenuOptions(e, context);
		showMenu = true;
	}
	
	function closeMenu() {
		showMenu = false;
	}
</script>

{#if showMenu}
	<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
			<div class="menu-header">{menuData.type}</div>
			<hr />
			{#each menuData.options as option}
				<MenuOption
					isDisabled={false}
					on:click={option.method(menuData.resource, menuData.user)}
					text={option.name}
				/>
			{/each}
	</Menu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />

<style>
	hr {
		border-top: 1px solid #0003;
		width: 100%;
		margin: 2px 0;
	}

	.menu-header {
		padding: 4px 15px;
		cursor: default;
		font-size: 14px;
		display: flex;
		align-items: center;
		grid-gap: 5px;
	}
</style>