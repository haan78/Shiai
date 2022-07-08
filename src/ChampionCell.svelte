<script>
    import { createEventDispatcher } from 'svelte';
    import { drawing } from './store.js';
    const dispatch = createEventDispatcher();
    export let path;
    
    let name = "";
    drawing.subscribe(v=>{
        if (Array.isArray(path) && path.length > 4 ) {
            var l = path[2];
            var i = path[3];
            var c = path[4];
            if ( v && v[l] && v[l][i] && typeof v[l][i][c] !== "undefined" ) {
                var n = v[l][i][c];                
                name = n ? n : '';
            }
            
        }
    });
    
    function click() {
        var cell = "champion";
        dispatch('click',{path,cell});
    }
</script>
<div class="champion" on:click={click}>{name}</div>
<style>
.champion {
    border-top: solid 2px black;
    border-right: solid 2px black;
    border-bottom: solid 2px black;
    border-left: solid 2px black;
    cursor: pointer;
    justify-content: center;
    font-size: larger;
}
</style>
