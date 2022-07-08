<script>
    import { DialogContent, getClose } from "svelte-dialogs";
    let sendClose =getClose();
    function Close() {        
        sendClose();
    }
</script>
<DialogContent>
    <svelte:fragment slot="body">
        <h2>Shortcuts</h2>
        <table>
            <tr><th>F11</th><td>Switch on/off Full Screen Mode</td></tr>
            <tr><th>N</th><td>Creates a new board</td></tr>
            <tr><th>M</th><td>Show or Hide the mouse cursor</td></tr>
            <tr><th>S</th><td>Start Stop Timer</td></tr>
            <tr><th>R</th><td>Reset Timer</td></tr>
            <tr><th>1</th><td>Opens 1th match details</td></tr>
            <tr><th>2</th><td>Opens 2th match details</td></tr>
            <tr><th>3</th><td>Opens 3th match details</td></tr>
            <tr><th>4</th><td>Opens 4th match details</td></tr>
            <tr><th>5</th><td>Opens 5th match details</td></tr>
            <tr><th>6</th><td>Opens 6th match details</td></tr>
            <tr><th>7</th><td>Opens 7th match details</td></tr>
            <tr><th>H</th><td>Opens this help window</td></tr>
            <tr><th>P</th><td>Saves png image of the board</td></tr>
            <tr><th>ESC</th><td>Closes the opened window</td></tr>
        </table>
        <div style="text-align: center;">
            <span>Version 0.1 Beta</span><br/>
            <a href="mailto:alibarisozturk@kendocu.com">Author: Ali Baris Ozturk(alibarisozturk@kendocu.com)</a>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="footer">
        <button class="btn" on:click={Close}>OK</button>
    </svelte:fragment>
</DialogContent>

<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    table tr th {
        text-align: left;
    }
    table tr td {
        text-align: left;
    }
    table tr td,table tr th {
        border-bottom: solid 2px black;
    }
</style>