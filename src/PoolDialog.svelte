<script>
    import { createEventDispatcher,onMount } from 'svelte';
    import { drawing,playersStore } from './store';
    import Dialog from './lib/Dialog.svelte';
    import "./dialogs.css";
    
    const dispatch = createEventDispatcher();
    export let poolIndex;

    let players = [];    
    let data = [];
    let availables = [];
    
    playersStore.subscribe(v=>players=v);
    drawing.subscribe(dData=>{
        var v = dData;
        if (!v) {
            v = [];
        }
        if (!v[0]) {
            v[0] = [];
        }
        if (!v[0][poolIndex]) {
            v[0][poolIndex] = [];
        }
        
        data = v;
        
    });

    function close() {
        dispatch("close",null);
    }

    function getAvailables() {          
        return players.reduce((pv,cv,ind)=>{
            if (!data[0].find(pool=>{
                console.log(pool);                
                return Array.isArray(pool) && typeof pool.find(pind=> {
                    return players[pind].name == cv.name;
                }) !== "undefined";
            })) {
                console.log(["PV",pv]);
                console.log(["CV",cv]);
                var ncv = Object.assign({},cv);
                ncv["index"] = ind;                
                pv.push(ncv);
            }
            return pv;
        },[]);
    }

    onMount(()=>{
        availables = getAvailables();
        //console.log(availables);
    });

    function add(index) {
        data[0][poolIndex].push(availables[index].index);
        data = data;
        availables = getAvailables();
        //console.log(availables);
        drawing.set(data);
    }
    function remove(index) {        
        data[0][poolIndex].splice(index,1);
        data = data;
        availables = getAvailables();
        //console.log(availables);
        drawing.set(data);
    }
    function clean() {
        if (!data[0]) {
            data[0] = [];
        }
        data[0][poolIndex] = [];
        drawing.set(data);
    }
</script>
<Dialog on:close={close}>
    <table class="main">
        <thead>
            <tr>                
                <th>Available List</th>
                <th>Pool({ poolIndex+1 }) List</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div>
                        {#each availables as p,i }<button on:click={()=>add(i)}>{p.name}</button>{/each}            
                    </div>
                    
                </td>
                <td>
                    <div>
                        {#each data[0][poolIndex] as pind,i }<button on:click={()=>remove(i)}>{players[pind].name}</button>{/each} 
                    </div>                    
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td><span title="Celan pool" on:click={clean}>&#xab;</span></td>
            </tr>
            <!--
            <tr>
                <td colspan="2">
                    <button class="okbtn" on:click={close}>OK</button>
                </td>
            </tr>
            -->
        </tfoot>

        
    </table>
</Dialog>
<style>    
    .main {
        border-collapse: collapse;
        border-spacing: 0;
        width: 30vw;

    }

    .main > tbody > tr > td {
        border: solid 1px black;
        vertical-align: top;
        width: 50%;
    }

    .main > tbody > tr > td > div {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        height: 10em;
        overflow-y: scroll;
    }
    .main > tbody > tr > td > div > button {
        display: block;
        width: 100%;
        font-size: smaller;
    }

    .main > tfoot > tr > td {
        padding: .3em;
        text-align: center;
    }

    .main > tfoot > tr:nth-child(1) {
        height: min-content;
    }
    .main > tfoot > tr:nth-child(1) > td {
        text-align: right;
        height: min-content;
    }
    .main > tfoot > tr:nth-child(1) > td > span {
        width: 3em;
        font-weight: bold;
        color: darkred;
        cursor: pointer;
    }

    /*.main > tfoot > tr:nth-child(2) > td > button {
        
    }*/

</style>
