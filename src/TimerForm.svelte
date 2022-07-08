<script>
    import { DialogContent, getClose } from "svelte-dialogs";
    import { onMount } from "svelte";
    let sendClose =getClose();
    let minutes = 0;
    let seconds = 0;
    export let timercount;
    function Close() {        
        // @ts-ignore
        sendClose( ( (minutes > 99 ? 99 : minutes ) * 60) + (seconds>59 ? 59 : seconds) );
    }
    onMount(()=>{
        minutes = ~~(timercount / 60);
        seconds = timercount % 60;
    });
</script>
<DialogContent>
    <svelte:fragment slot="body">
        <fieldset>
            <legend>Set Timer</legend>
            <label>Minutes<br/>
                <input bind:value={minutes} type="number" min="0" max="99" title="Value must between 0-99" maxlength="2">
            </label>
            <label>Seconds<br/>
                <input bind:value={seconds} type="number" min="0" max="59" title="Value must between 0-59" maxlength="2">
            </label>
        </fieldset>
    </svelte:fragment>
    <svelte:fragment slot="footer">
        <button class="btn" on:click={Close}>OK</button>
    </svelte:fragment>
</DialogContent>

<style>
    label {
        display: inline-block;
        text-align: left;
    }
    input[type="number"] {
        width: 4em;
        font-size: large;
    }
</style>