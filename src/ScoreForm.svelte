<script>
    import { DialogContent, getClose } from "svelte-dialogs";
    import { onMount } from "svelte";
    import base from "./base";
    const sendClose = getClose();
    export let match =  null; 
    export let number;
    let data = base.createMatch("","");    
    function Close() {
        // @ts-ignore
        sendClose(data);
    }

    onMount(()=>{
        data = Object.assign({}, match);        
    });

    function w_ippon1change() {
        if (data.white.ippon1 == null) {
            data.white.ippon2 = null;
        }
    }

    function r_ippon1change() {
        if (data.red.ippon1 == null) {
            data.red.ippon2 = null;
        }
    }


</script>
<DialogContent>
    <svelte:fragment slot="body">
        <table id="tbl1">
            <thead>
                <tr>
                    <td>{number}</td>
                    <th>{data.white.name}</th>
                    <th>{data.red.name}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>1. Ippon</th>
                    <td><select bind:value={data.white.ippon1} on:change={w_ippon1change}>
                        <option value={null} >[None]</option>
                        <option value="men" >Men</option>
                        <option value="kote" >Kote</option>
                        <option value="do">Do</option>
                        <option value="tsuki">TSuki</option>
                        <option value="hippon">H-Ippon</option>
                    </select></td>
                    <td>
                        <select bind:value={data.red.ippon1} on:change={r_ippon1change}>
                            <option value={null} >[None]</option>
                            <option value="men" >Men</option>
                            <option value="kote" >Kote</option>
                            <option value="do">Do</option>
                            <option value="tsuki">TSuki</option>
                            <option value="hippon">H-Ippon</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>2. Ippon</th>
                    <td><select bind:value={data.white.ippon2} disabled={data.white.ippon1 == null}>
                        <option value={null} >[None]</option>
                        <option value="men" >Men</option>
                        <option value="kote" >Kote</option>
                        <option value="do">Do</option>
                        <option value="tsuki">TSuki</option>
                        <option value="hippon">H-Ippon</option>
                    </select></td>
                    <td>
                        <select bind:value={data.red.ippon2} disabled={data.red.ippon1 == null}>
                            <option value={null} >[None]</option>
                            <option value="men" >Men</option>
                            <option value="kote" >Kote</option>
                            <option value="do">Do</option>
                            <option value="tsuki">TSuki</option>
                            <option value="hippon">H-Ippon</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Hansoku</th>
                    <td><select bind:value={data.white.hansoku}>
                        <option value={0}>[None]</option>
                        <option value={1}>1th</option>
                        <option value={2}>2th</option>
                        <option value={3}>3th</option>
                        <option value={4}>4th</option>
                    </select></td>
                    <td>
                        <select bind:value={data.red.hansoku}>
                            <option value={0}>[None]</option>
                            <option value={1}>1th</option>
                            <option value={2}>2th</option>
                            <option value={3}>3th</option>
                            <option value={4}>4th</option>
                        </select>
                    </td>
                </tr>                
                
            </tbody>
            <tfoot>
                <tr>
                    <th>Hikiwake or Hantei</th>
                    <td colspan="2">
                        <select bind:value={data.hikiwake}>
                            <option value={null}>[None]</option>
                            <option value="hikiwake">Hikiwake</option>
                            <option value="white">Hantei White</option>
                            <option value="red">Hantei Red</option>                            
                        </select>
                    </td>
                </tr>
            </tfoot>
        </table>
        
    </svelte:fragment>
    <svelte:fragment slot="footer">
        <button class="btn" on:click={Close}>OK</button>
    </svelte:fragment>
</DialogContent>
<style>
    @import "./base.css";
    #tbl1 {
        width: 100%;
        border-collapse: collapse;
        background-color: bisque;
        border: solid 2px black;
    }
    #tbl1 thead tr th {
        text-align: left;
    }

    #tbl1 thead tr th:nth-child(2) {
        background-color: white;
    }

    #tbl1 thead tr th:nth-child(3) {
        background-color: red;
    }

    #tbl1 tbody tr td:nth-child(2) {
        background-color: white;
    }

    #tbl1 tbody tr td:nth-child(3) {
        background-color: red;
    }

    #tbl1 tbody tr th {
        text-align: right;
        width: 0%;

    }
    #tbl1 tbody tr td select,#tbl1 tfoot tr td select {
        width: 100%;
    }

    #tbl1 tr td, #tbl1 tr th {
        border-bottom: solid 2px black;
        padding: .5em;
    }
</style>