<script>
    import { createEventDispatcher,onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { playersStore,drawing } from './store';
    import Dialog from './lib/Dialog.svelte';
    import "./dialogs.css";
    
    const dispatch = createEventDispatcher();
    let clear = false;
    let list = [];
    let playerCount = 5;
    let message="";

    function setList() {
        message = "";
        var ind = list.findIndex(p=>{
            return !p;
        });

        if (ind>-1) {
            message = `Number ${ind+1} needs a name`;
            return;            
        }

        for(var i=0; i<list.length-1; i++) {
            for(var j=i+1; j<list.length; j++) {
                if (list[i].name == list[j].name) {
                    message = `${ind+1}. ${list[j].name} is defined previously`;
                    return;
                }
            }
        }

        if (playerCount == 1) {
            list = list.map(p=>{                
                return {
                    name:p.name,
                    players:[p.name]
                };
            });
        }

        console.log("update");
        playersStore.set(list);
        if (clear) {
            drawing.set([]);
        }
        close();
        console.log(list);
    }

    function close() {
        dispatch("close",null);
    }

    function add() {
        var arr = (new Array(playerCount)).fill("");  
        list.push({
            name:"",
            players:arr
        });
        list = list;        
    }

    function countcahnge() {
        for(var i=0; i<list.length; i++) {
            var arr = [];
            for(var j=0; j<playerCount; j++) {
                arr.push( list[i].players[j] || "" );
            }
            list[i].players = arr;
        }
    }

    function cleraList() {
        list = [];
    }

    function remove(ind) {
        list.splice(ind,1);
        list = list;
    }

    onMount(()=>{
        clear = false;
        list = JSON.parse(JSON.stringify(get(playersStore)));
        console.log(list);
        if (list.length > 0) {
            playerCount = list[0].players.length;
        }
    });
</script>
<Dialog on:close={close}>
    <div class="playersdiv">
        <h1>Players</h1>
        <div class="head">
            <button on:click={add}>Add One</button>
            <button on:click={cleraList}>Clear</button>
            <select bind:value={playerCount} on:change={countcahnge}>
                <option value={1}>Individual</option>
                <option value={3}>Team (3 Players)</option>
                <option value={5}>Team (5 Players)</option>
            </select>
        </div>
        <div class="body">
            {#each list as p,i }
                <div class="cell">
                    <div class="title">
                        <button on:click={()=>remove(i)} title="Click to remove item" >{i+1}</button>
                        <input type="text" size="16" maxlength="16" bind:value={p.name} placeholder={playerCount == 1 ? 'Player Name' : 'Team Name' } />
                    </div>
                    {#if playerCount>1 }
                        {#each p.players as pname }
                            <div class="player"><input type="text" bind:value={pname} placeholder="Player Name" /></div>
                        {/each}
                    {/if}
                </div>                
            {/each}
        </div>
        <div class="foot" >
            <button class="okbtn" on:click={setList}>OK</button>
        </div>
        
    </div>
</Dialog>
<style>
    .playersdiv {
        text-align: center;
    }
    .playersdiv > .head {
        text-align: center;
    }
    .playersdiv > .foot {
        text-align: center;
    }
    .playersdiv > .body {
        display: flex;
        height: auto;
        max-height: 35em;
        width: 40em;
        overflow-y: scroll;
        flex-flow: row wrap;
        flex-direction: row;
        align-content: flex-start;
    }

    .playersdiv > .body > .cell {
        width: 16em;
        border: solid 2px black;
        margin: .5em;
        height: min-content;
        font-size: x-small;
        padding: .5em;
        background-color: cadetblue;
    }

    .playersdiv > .body > .cell > .title {
        display: grid;
        grid-template-columns: min-content auto;
        grid-template-rows: auto;
        border: solid 2px darkblue;
    }

    .playersdiv > .body > .cell > .title > button {
        background-color:brown;
        color: bisque;
        width: 3em;
        margin-right: 0;
        height: 100%;
    }

    .playersdiv > .body > .cell > .title > input {
        margin: 0;
        font-weight: bolder;
    }


    .playersdiv > .body > .cell > .player {
        height: min-content;
        width: 100%;
    }
    .playersdiv > .body > .cell > .player > input {
        width: 100%;
        margin-bottom: 0;
        margin-top: .5em;
    }

</style>