<script>
    import "./drawing.css";
    import { createEventDispatcher } from "svelte";

    import Pool from "./PoolCell.svelte";
    import Elim from "./EliminationCell.svelte";
    import Champion from "./ChampionCell.svelte";

    console.log(Elim);
    const dispatch = createEventDispatcher();
    function cellclick(evt) {
        dispatch("click", evt.detail);
    }
</script>

<div class="dmain" data-model="9">
    <div class="jo">Shiai-Jo A</div>
    <Pool number={1} on:click={cellclick} />
    <div class="bl jr c3">P1#1</div>
    <Elim path={[0, 0, 2, 0, 0, 1]} on:click={cellclick} />
    <div class="c4" />
    <div class="rl c5" />
    <div class="bl">3</div>
    <Elim path={[2, 0, 3, 0, 0, 3]} on:click={cellclick} />
    <div class="c2" />
    <Pool number={2} on:click={cellclick} />
    <div class="bl jr">P2#1</div>
    <Elim path={[0, 1, 1, 0, 0, 2]} on:click={cellclick} />
    <div class="rl c2" />
    <div class="rl c2" />
    <div class="c2" />
    <div class="rl c3" />
    <div class="bl">1</div>
    <Elim path={[1, 0, 2, 0, 1, 1]} on:click={cellclick} />
    <div class="rl c2" />
    <div class="c2" />
    <div class="rl c3" />
    <div class="rl c4" />
    <div class="bl">5</div>
    <Champion path={[3, 0, 4, 0, 0, 5]} on:click={cellclick} />
    <div class="jr c2">P2#2</div>
    <Elim path={[0, 1, 1, 0, 1, 2]} on:click={cellclick} />
    <div class="rl c4" />
    <div class="c2" />
    <Pool number={3} on:click={cellclick} />
    <div class="bl jr c3">P3#1</div>
    <Elim path={[0, 2, 2, 1, 0, 3]} on:click={cellclick} />
    <div class="rl c2" />
    <div class="c2" />
    <div class="rl c5" />
    <div class="bl">4</div>
    <Elim path={[2, 1, 3, 0, 1, 4]} on:click={cellclick} />
    <div class="c2" />
    <div class="jr c2">P2#2</div>
    <Elim path={[0, 1, 1, 1, 0, 2]} on:click={cellclick} />
    <div class="rl c2" />
    <div class="c4" />
    <div class="rl c3" />
    <div class="bl">2</div>
    <Elim path={[1, 1, 2, 1, 1, 2]} on:click={cellclick} />
    <div class="c4" />
    <div class="rl c3" />
    <div class="c6" />
    <div class="jr c2">P1#2</div>
    <Elim path={[0, 0, 1, 1, 1, 2]} on:click={cellclick} />
    <div class="c6" />
</div>
