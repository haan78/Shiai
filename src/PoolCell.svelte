<script>
    import { createEventDispatcher } from 'svelte';
    import { drawing } from './store.js';
    const dispatch = createEventDispatcher();    
    export let number;

    let list = [];
    drawing.subscribe(v=>{
        if (v && Array.isArray(v[0]) && Array.isArray(v[0][number-1]) ) {
            list = v[0][number-1];
        } else {
            list = [];
        }
    });

    
    function click(target) {
        var index = number-1;
        var cell = "pool";
        dispatch('click',{ number,index,cell,target });
    }

    function board() {

    }
</script>
<div class="pool">
    <span on:click={()=>click("list")} title="Click to open player list" >P{number}</span>
    <ul on:click={()=>click("board")} title="Click to open pool matches">
        {#each list as p }<li>{p.name}</li>{/each}
    </ul>
</div>
<style>
.pool {
    white-space: nowrap;
    border: solid 2px black;
    padding: 0;
    min-width: 20em;
}

.pool > span {
    cursor: pointer;
    display: flex;
    font-weight: bolder;
    padding-right: .5em;
    background-color: black;
    color: white;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 100%;
    align-items: center;
    height: 100%;
}

.pool > ul {
    cursor: pointer;
    display:inline;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 2em;
    list-style-type: upper-roman;
    overflow: hidden;
}

.pool > ul > li {
    display: list-item;
    float: left;
    margin-right: 2em;
}
</style>