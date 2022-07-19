export default (container) => {
    return {
        container:container,
        __alert:null,
        __stettings:{
            time:3000,
            pos:"center",
            id:"__alert_div"
        },
        __create(type,message,closefnc) {
            this.__alert = this.container.querySelector("#"+this.__stettings.id);
            if (!this.__alert) {
                this.__alert = document.createElement("div");
                this.__alert.id = this.__stettings.id;
                this.__alert.classList.add("alert",this.__stettings.pos);
                this.container.appendChild(this.__alert);
            }
            var frame = document.createElement("div");            
            frame.classList.add("frame",type);
            frame.innerHTML = message;
            frame.addEventListener("click",() =>{
                //var div = this.container.querySelector("#"+this.__stettings.id);
                if (frame) {
                    this.__alert.removeChild(frame);
                    closefnc();
                }                 
            });
            this.__alert.appendChild(frame);
            if ( this.__stettings.time > 0 ) {
                setTimeout(()=>{
                    //var div = this.container.querySelector("#"+this.__stettings.id);
                    if (frame) {
                        this.__alert.removeChild(frame);
                        closefnc();
                    }                    
                },this.__stettings.time);
            }

        },
        time(milliseconds) {
            this.__stettings.time = !isNaN(parseInt(milliseconds)) ? parseInt(milliseconds) : 3000;
            return this;
        },
        pos(position) {
            this.__stettings.pos = ["top-center","top-left","top-right","bottom-center","bottom-left","bottom-right","center"].includes(position) ? position : "top-center";
            return this;
        },
        good(message) {
            let self = this;
            return new Promise(function(resolve, reject) {
                self.__create("good",message,()=>{
                    resolve(true);
                });
            });
        },
        bad(message) {
            let self = this;
            return new Promise(function(resolve, reject) {
                self.__create("bad",message,()=>{
                    resolve(true);
                });
            });
        },
        ugly(message) {
            let self = this;
            return new Promise(function(resolve, reject) {
                self.__create("ugly",message,()=>{
                    resolve(true);
                });
            });
        }
    }
}