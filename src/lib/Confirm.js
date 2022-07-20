import "./Confirm.css";
export default (container) => {
    return {
        container: container,
        __div:null,
        __modalclick:false,
        __stettings: {
            btnYes:"Yes",
            btnNo:"No",
            id:"__confirm_div"
        },
        __delete() {
            if (this.__div && this.__div.parentElement) {
                var pe = this.__div.parentElement;
                pe.removeChild(this.__div);
            }
        },
        __create(message,title,yesfnc,nofnc) {
            this.__div = this.container.querySelector("#" + this.__stettings.id);
            if (!this.__div) {
                this.__div = document.createElement("div");
                this.__div.id = this.__stettings.id;
                this.__div.classList.add("confirm","background");
                this.container.appendChild(this.__div);
            } else {
                this.__div.innerHTML = "";
            }         
            var modal = document.createElement("div");
            var header = document.createElement("div");
            var body = document.createElement("div");
            var footer = document.createElement("div");
            var yes = document.createElement("button");
            var no = document.createElement("button");

            yes.addEventListener("click",()=>{
                this.__delete();
                yesfnc();
            });
            no.addEventListener("click",()=>{
                this.__delete();
                nofnc();
            });

            modal.classList.add("modal");
            header.classList.add("header");
            body.classList.add("body");
            footer.classList.add("footer");
            yes.classList.add("yes");
            no.classList.add("no");



            header.innerHTML = title || "";
            body.innerHTML = message;
            yes.innerHTML = this.__stettings.btnYes;
            no.innerHTML = this.__stettings.btnNo;

            footer.appendChild(yes);
            footer.appendChild(no);
            
            modal.appendChild(header);
            modal.appendChild(body);
            modal.appendChild(footer);
            modal.onclick = () =>{
                this.__modalclick = true;
            }
            this.__div.appendChild(modal);
            this.__div.onclick = () =>{
                if (!this.__modalclick) {
                    this.__delete();
                    nofnc();    
                }
                this.__modalclick = false;
            };
        },
        ask(message,title) {
            return new Promise((resolve, reject)=>{
                this.__create(message,title,()=>{
                    resolve(true);
                },()=>{
                    reject(false);
                });
            });
        }
    };
}