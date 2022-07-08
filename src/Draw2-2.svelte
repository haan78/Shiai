<script>
    import "./drawing.css";
    import { createEventDispatcher } from 'svelte';

    import Pool from './PoolCell.svelte';
	import Elim from './EliminationCell.svelte';
	import Champion from './ChampionCell.svelte';

    const dispatch = createEventDispatcher();
    function cellclick(evt) {
        dispatch("click",evt.detail);
    }
</script>
<div class="dmain" data-model="6">
    <div class="jo">Shiai-Jo A</div>
    
    <Pool number={1} on:click={cellclick} />
    <div class="bl jr">P1#1</div>
    <Elim path={[0,0,1,0,0,1]} on:click={cellclick} />
    <div />
    <div />
    <div />
    <div />
    
    <div />
    <div />
    <div class="rl" />
    <div class="bl">1</div>
    <Elim on:click={cellclick} path={[1,0,2,0,0,1]} />
    <div />			
    <div />

    <div/>
    <div />
    <div class="rl" />
    <div />
    <div class="rl" />
    <div/>
    <div/>

    <div/>
    <div class="jr">P2#2</div>
    <Elim on:click={cellclick} path={[0,1,1,0,1,2]} />
    <div />
    <div class="rl" />
    <div/>
    <div/>
    
    <div/>
    <div/>
    <div/>
    <div/>
    <div div class="rl"/>
    <div class="bl">3</div>	
    <Champion path={[2,0,3,0,0,3]} on:click={cellclick} />

    <Pool number={2} on:click={cellclick} />			
    <div class="bl jr">P2#1</div>
    <Elim path={[0,1,1,1,0,1]} on:click={cellclick} />				
    <div/>
    <div class="rl" />
    <div/>
    <div/>

    <div/>
    <div/>
    <div class="rl" />
    <div class="bl">2</div>
    <Elim path={[1,1,2,0,1,2]} on:click={cellclick}  />	
    <div/>
    <div/>
    
    <div/>
    <div/>
    <div class="rl" />
    <div/>
    <div/>
    <div/>
    <div/>
    
    <div/>
    <div class="jr">P1#2</div>
    <Elim path={[0,0,1,1,1,2]} on:click={cellclick}  />
    <div/>
    <div/>
    <div/>
    <div/>
</div>