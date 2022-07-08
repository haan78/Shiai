

export default {
    createPlayer(name) {
        return { name:name, ippon1:null, ippon2:null,hansoku:0 };
        /*return {
            "name":name,
            ippon1:"men",
            ippon2:"kote",            
            hansoku:3            
        };*/
    },

    createMatch(red,white) {
        return {
            red:this.createPlayer(red),
            white:this.createPlayer(white),
            hikiwake:null
        }
    },

    createSample() {
        return {
            white: "White Team",
            red: "Red Team",
            matches: [
                this.createMatch("Red Player 1", "White Player 1"),
                this.createMatch("Red Player 2", "White Player 2"),
                this.createMatch("Red Player 3", "White Player 3"),
                this.createMatch("Red Player 4", "White Player 4"),
                this.createMatch("Red Player 5", "White Player 5")
            ],
            title: "Pool ?",
            time: 240,
        };
    }

};

