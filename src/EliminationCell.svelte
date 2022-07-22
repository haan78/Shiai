<script>
    import { createEventDispatcher,onMount } from 'svelte';
    import { drawing } from './store.js';
    const dispatch = createEventDispatcher();
    export let path;
    
    let name = "";
    let color = "none";
    drawing.subscribe(v=>{
        if (Array.isArray(path) && path.length > 4 ) {
            var l = path[2];
            var i = path[3];
            var c = path[4];
            if ( v && v[l] && v[l][i] && typeof v[l][i][c] !== "undefined" ) {
                var n = v[l][i][c];                
                name = n ? n.name : '';
            } else {
                name = '';
            }
            
        }
    });
    
    function click() {
        var cell = "elimination";
        dispatch('click',{path,cell});
    }
    onMount(()=>{
        if (Array.isArray(path) && typeof path[4] !== "undefined") {
            if (path[4]) {
                color = "white";
            } else {
                color = "red";
            }
        }
    });
</script>
<div class="{'cell '+color}" on:click={click}><span>{name}</span><span /></div>
<style>
.cell {
    border: solid 2px black;
    cursor: pointer;
    justify-content: center;
    font-size: larger;
}

.red >span:nth-child(1) {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.red >span:nth-child(2) {
    height: 100%;
    width: 1em;
    background-color: red;
    border: solid 2px black;
}

.white >span:nth-child(1) {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.white > span:nth-child(2) {
    height: 100%;
    width: 1em;
    background-color: white;
    border: solid 2px black;
}
</style>
