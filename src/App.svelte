<script>
	import "./drawing.css";
	import PlayerSelect from "./PlayerSelect.svelte";
	import PoolDialog from "./PoolDialog.svelte";
	import Players from './Players.svelte';

	import { get } from 'svelte/store';
    import { playersStore } from './store';
	import { onMount } from "svelte";
	
	import Board from './Board.svelte';

	import Draw from "./Draw3-2.svelte";

	function cellclick(evt) {
		if ( evt.detail.cell == "pool" ) {
			poolIndex = evt.detail.index;
			if (evt.detail.target == "list") {
				dialog = 'pool';
			} else if (evt.detail.target == "board") {
				path = [0,poolIndex,poolIndex+1]
				screen = "board";				
			}
			
		} else {
			path = evt.detail.path;
			dialog = "elim";
		}
	}

	function playersclose(evt) {
		screen = "draw";
		console.log(evt);
	}

	function openplayers(evt) {
		screen = "players";
	}

	let dialog = "";
	let poolIndex = 0;
	let path = [0,0,0,0,0,0];
	let screen = "draw";

	function dialogclose() {
		dialog = "";
	}

	onMount(()=>{
		var pl = get(playersStore);
		if (Array.isArray(pl) && pl.length == 0 ) {
			screen = "players";
		}
	});
</script>

<main>
	{#if (dialog=="pool")}
	<PoolDialog	poolIndex={poolIndex} on:close={dialogclose} />
	{:else if (dialog=="elim")}
	<PlayerSelect path={path} on:close={dialogclose} />
	{/if}
	{#if (screen == "draw")}
	<Draw on:click={cellclick} />
	<button class="newbtn" on:click={openplayers}>Players</button>
	{:else if (screen=="board")}
	<Board path={path} />
	{:else if (screen == "players")}
		<Players on:close={playersclose} />
	{/if}
</main>

<style>
	.newbtn {
		z-index: 10;

		position: absolute;
		top: 1em;
		right: 1em;
		background-color: cadetblue;
		color: chartreuse;
		font-weight: bold;
		width: 5em;
		height: 2em;
	}
	.newbtn:hover {
		visibility: visible;
	}
</style>
