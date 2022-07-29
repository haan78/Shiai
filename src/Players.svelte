<script>
    import { createEventDispatcher,onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { playersStore,drawing,matches } from './store';
    import Alert from "./lib/Alert";
    import Confirm from "./lib/Confirm";
    import Number from "./lib/Number.svelte";

    import "./dialogs.css";
    let container;
    const dispatch = createEventDispatcher();    
    let list = [];
    let playerCount = 5;
    let message="";
    let tournomentCount = 12;
    let system = 2;

    function setList() {

        function isNecessary(poolind,playerind) {
            if ( (list[poolind].players.length == 4 &&  playerind == 3) || (list[poolind].players.length == 6 &&  playerind == 5) ) {
                return false;
            } else {
                return true;
            }
            
        }

        message = "";
        console.log(list);
        var ind = list.findIndex(p=>{
            return !p;
        });

        if (ind>-1) {
            message = `Number ${ind+1} needs a name`;
            Alert(container).bad(message);
            return;            
        }

        for(var i=0; i<list.length; i++) {
            list[i].name = list[i].name.trim().toUpperCase();
            if ( !list[i].name ) {
                Alert(container).bad(`${i+1}th. ${ playerCount == 1 ? "Player" : "Team" } needs a name`);                
                return;
            }
            if ( playerCount == 1 ) {
                list[i].players = [list[i].name];
                console.log(list[i]);
            }
            for(var j = 0; j<list[i].players.length; j++ ) {
                list[i].players[j] = list[i].players[j].trim().toUpperCase();
                if (!list[i].players[j] && isNecessary(i,j)) {
                    Alert(container).bad(`${ j+1 }th. Player of the ${i+1}th. Team  needs a name`);
                    return;
                }
            }

            for(var l = 0; l<i; l++) {
                if ( list[l].name == list[i].name ) {
                    Alert(container).bad(`${ i+1 }th. ${ playerCount == 1 ? "Player" : "Team" } name has been defined in ${l+1}th`);
                    return;
                } else {
                    for(var m=0; m<list[l].players.length; m++) {
                        var ind = list[i].players.indexOf(list[l].players[m]);
                        if ( ind > -1 && list[l].players[m] ) {
                            Alert(container).bad(`${ind+1}th. player of ${ i+1 }th. Team name has been defined in ${l+1}th Team as number ${m+1}`);
                            return;
                        }
                    }
                }                    
            }
        }


        Confirm(container).ask("What would you likt to do?","Save Changes",[            
            "Keep current matches and drawings and just change team and/or player informations.",
            "Clear all existence data and create new tournament by this player informations",
            "Don't do anything!"
        ]).then((ind)=>{
            if ( ind == 0 ) {                
                playersStore.set(list);
                close();
            } else if ( ind == 1 ) {
                playersStore.set(list);
                drawing.set([]);
                matches.set([]);
                close();
            }
        });
    }
    
    function close() {
        dispatch("close",null);
    }

    function add() {        
        list.push({
            name:"",
            players:(new Array(playerCount)).fill("")
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
        tournomentCount = 12;
        playerCount = 6;
    }

    function remove(ind) {
        Confirm(container).ask(`Are you sure to remove ${ind+1}th ${ (playerCount==1 ? "player" : "team") }`).then(()=>{
            list.splice(ind,1);
            list = list;
        });        
    }

    function create() {
        for(var i=0; i<tournomentCount; i++) {
            add();
        }
    }

    onMount(()=>{
        list = JSON.parse(JSON.stringify(get(playersStore)));
        console.log(list);
        if (list.length > 0) {
            playerCount = list[0].players.length;
        }
    });
</script>
<main bind:this={container}>
    {#if (list.length == 0)}
    <div class="formdiv">
        <fieldset>
            <legend>Number of {playerCount==1 ? 'Competitor' : 'Team'}</legend>
            <Number min={5} max={256} bind:value={tournomentCount} />
        </fieldset>
        <fieldset>
            <legend>Turnoment Type</legend>
            <select bind:value={playerCount} on:change={countcahnge}>
                <option value={1}>Individual</option>
                <option value={3}>Team (3 Players)</option>
                <option value={4}>Team (3 Players and 1 substitute)</option>
                <option value={5}>Team (5 Players)</option>
                <option value={6}>Team (5 Players and 1 substitute)</option>
            </select>
        </fieldset>
        <fieldset>
            <legend>System</legend>
            <select bind:value={system}>                
                <option value={2}>Two candidates from each pool advance to the next round</option>
                <option value={1}>Only one candidate from each pool advance to the next round</option>
                <option value={0}>Elimination</option>
            </select>
        </fieldset>
        <button on:click={create} >Create New</button>
    </div>
    {/if}
    <div class="playersdiv">
        <h1>Players</h1>
        <div class="head">            
            {#if (list.length > 0) }
            <button on:click={cleraList}>Clear</button>
            <button on:click={add}>Add</button>
            {/if}
            
        </div>
        <div class="body">
            {#each list as p,i }
                <div class="cell">
                    <div class="title">
                        <button on:click={()=>remove(i)} title="Click to remove item" >{i+1}</button>
                        <input type="text" size="16" maxlength="16" bind:value={p.name} placeholder={playerCount == 1 ? 'Player Name' : 'Team Name' } />
                    </div>
                    {#if playerCount>1 }
                        {#each p.players as pname,i }
                            <div class="player">
                                {#if (playerCount == 4 || playerCount == 6) && (i == playerCount - 1) }
                                <span>Sub</span>
                                {:else}
                                <span>{i+1}th</span>
                                {/if}
                                
                                <input type="text" bind:value={pname} placeholder="Player Name" />
                            </div>
                        {/each}
                    {/if}
                </div>                
            {/each}
            
        </div>
        <div class="foot" >
            <button class="okbtn" on:click={setList}>OK</button>
        </div>
        
    </div>
</main>
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
        width: 100%;
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
        cursor: pointer;
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
        white-space: nowrap;
        height: min-content;
        width: 100%;
    }

    .playersdiv > .body > .cell > .player > span {
        text-align: right;
        display: inline-block;
        width: 8%;
        margin-right: 2%;
    }

    .playersdiv > .body > .cell > .player > input {
        width: 90%;
        margin-bottom: 0;
        margin-top: .5em;
        display: inline-block;
    }

</style>