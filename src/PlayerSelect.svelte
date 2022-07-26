<script>
    import { createEventDispatcher } from 'svelte';
    import { drawing,playersStore } from './store';
    import Dialog from './lib/Dialog.svelte';
    import "./dialogs.css";
    
    const dispatch = createEventDispatcher();
    export let path;
    let data;

    let players = [];
    playersStore.subscribe(v=>players=v);

    $: list = getList(data,path);
    $: title = getTitle(path);

    drawing.subscribe(dData=>{
        var v = dData;
        if (!v) {
            v=[];
        }
        if (!v[path[0]]) {
            v[path[0]] = [];
        }
        if (!v[path[0]][path[1]]) {
            v[path[0]][path[1]] = [];
        }
        if (!v[path[2]]) {
            v[path[2]] = [];
        }
        if ( !v[path[2]][path[3]] ) {
            v[path[2]][path[3]] = [];
        }
        if ( !v[path[2]][path[3]][path[4]] ) {
            v[path[2]][path[3]][path[4]] = "";
        }
        data = v;
    });
    function close() {
        dispatch('close',null);        
    }

    function clear() {
        data[path[2]][path[3]][path[4]] = "";
        drawing.set(data);        
        close();
    }

    function select(p) {
        data[path[2]][path[3]][path[4]] = p;
        drawing.set(data);        
        close();
    }

    function getTitle(p) {
        if (p[0]==0) {
            return `${p[5]}th. Place of Pool ${(p[1]+1)} `;
        } else if (p[5]) { //burda bi hata var 
            return `Winner of the match number ${p[5]}`;
        } else {
            return "";
        }
    }

    function getList(d,p) {
        var arr = [];
        if ( p && typeof p[0] != "undefined" && typeof p[1] != "undefined" ) {
            var level = p[0];
            var index = p[1];
            if ( d && d[level] && d[level][index] ) {
                arr = d[level][index];
                arr = arr.filter(p0=>{
                    //console.log({ "level":level, group:data[level], "p0":p0, "p1":p1, "index":index, "ind":ind, "result":result });
                    var tl = path[2];
                    if (data[tl]) {
                        for(var i=0; i<data[tl].length; i++) {
                            if (Array.isArray(data[tl][i]) && data[tl][i].includes(p0)) {
                                return false;
                            }
                        }
                    }
                    return true;
                });
                //console.log({"arr":arr});
            }
        }
        return arr;        
    }
</script>
<Dialog on:close={()=>close()}>
    <div class="main">
        <div style="width: 100%">
            <h2>{title}</h2>
        {#if (list.length == 2)}
        <div><button class="btn" on:click={()=>select(list[0])}><span>{players[list[0]].name}</span><span class="red">&nbsp;&nbsp;</span></button></div>
        <div><button class="btn" on:click={()=>select(list[1])}><span>{players[list[1]].name}</span><span class="white">&nbsp;&nbsp;</span></button></div>
        {:else if (list.length > 0) }
            {#each list as p }
            <div><button class="btn" on:click={()=>select(p)}>{players[p].name}</button></div>
            {/each}
        {:else}
            <h2>There is no option</h2>
        {/if}
        <hr/>
        <div><button class="okbtn" on:click={clear}>Clear</button></div>
    </div>
    </div>
</Dialog>
<style>
    .main {
        width: 30em;
        height: 15em;
        display: flex;
        align-items: center;
    }
    .main div {
        text-align: center;
    }
    .main .btn {
        width: 90%;
    }
    .main .btn span:nth-child(1) {
        margin-right: 2em;
    }
    .main .btn .red {
        background-color: red;
        border: solid 1px black;
    }
    .main .btn .white {
        background-color: white;
        border: solid 1px black;
    }
</style>