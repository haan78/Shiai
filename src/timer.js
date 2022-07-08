export default (intervalfnc) => {    
    return {
        _fnc:intervalfnc,
        _count:0,
        _interval:null,
        _pause:false,
        _needRefresh : true,
        _intTime:1000,
        _intFnc() {
            if (!this._pause) {
                this._count++;                        
            }
            this._fnc(this._count,this._pause);
        },
        toStr(seconds) {            
            return ( ~~(seconds/60)+"" ).padStart(2,"0")+":"+(( seconds % 60 )+"").padStart(2,"0");
        },        
        dispose() {
            if ( this._interval === null ) {
                clearInterval(this._interval);
                this._fnc = null;
            }
        },
        startstop() {
            this._pause = ! this._pause;
            if (!this._pause) {
                this.refresh();
            }
            
        },
        start() {
            this._pause = false;
            this.refresh();
        },
        stop() {
            this._pause = true;
        },
        refresh() {
            if (this._needRefresh) {
                if (this._interval != null) {
                    clearInterval(this._interval);
                }                
                let self = this;
                this._interval = setInterval(()=>{self._intFnc();},this._intTime);
                this._needRefresh = false;
            }
        },
        count() {
            return this._count;
        },
        reset(seconds) {
            this._count = seconds ? seconds : 0;
            this._pause = true;
            this._fnc(this._count,this._pause);
            this._needRefresh = true;
        }
    };
}