<script>
    import "./boardgrid.css";
    import { dialogs } from "svelte-dialogs";
    import figures from "./figures";
    import ScoreForm from "./ScoreForm.svelte";
    import Help from "./Help.svelte";
    import { onMount } from "svelte";
    import Timer from "./timer";
    import TimerForm from "./TimerForm.svelte";
    import html2canvas from 'html2canvas';
    import { get } from 'svelte/store'
    import { matches,drawing } from "./store";

    export let path;

    let dialogactive = false;
    let timestr = "00:00";
    let timerpouse = false;
    let tabledata = null;
    let nocursor = false;

    function create(p) {        
        function createPlayer(name) {
            return { name:name, ippon1:null, ippon2:null,hansoku:0 };
        }
        function createMatch(red,white) {
            return {
                red:createPlayer(red),
                white:createPlayer(white),
                hikiwake:null
            }
        }        
        var level = p[0];
        var index = p[1];
        var number = p[2];
        var ml = get(matches);
        var dr = get(drawing);
        var result = {
            red:"Red",
            white:"White",
            time:0,
            title: (level == 0 ? "Pool "+number : "Elimination "+number),
            matches:[]
        }
        if (!ml[level]){
            ml[level] = [];
        }
        if (!ml[level][index]) {
            ml[level][index] = [];
        }
        if (ml[level][index].length == 0) {
            var players = dr[level][index];
            if (  players.length == 2 ) {
                ml[level][index][0] = createMatch(players[0], players[1]);
                matches.set(ml);
                result.matches = ml[level][index];
            } else if (players.length == 3)  {
                ml[level][index][0] = createMatch(players[0], players[1]);
                ml[level][index][1] = createMatch(players[0], players[2]);
                ml[level][index][2] = createMatch(players[1], players[2]);
                console.log(ml[level][index]);
                matches.set(ml);
                result.matches = ml[level][index];
            } else if (players.length  == 4)  {
                ml[level][index][0] = createMatch(players[0],players[1]);
                ml[level][index][1] = createMatch(players[2],players[1]);
                ml[level][index][2] = createMatch(players[2],players[3]);
                ml[level][index][3] = createMatch(players[1],players[3]);
                ml[level][index][4] = createMatch(players[2],players[0]);
                ml[level][index][5] = createMatch(players[3],players[0]);                
                matches.set(ml);
                result.matches = ml[level][index];
            } else {
                result.matches = [];
            }
        } else {
            result.matches = ml[level][index];
        }
        return result;
    }

    function help() {
        if (dialogactive) return;
        dialogactive = true;
        // @ts-ignore
        dialogs.modal(Help, {}).then(() => {
            dialogactive = false;
        });
    }

    function Score(mind) {
        if (dialogactive) return;
        if (!tabledata.matches[mind]) return;
        var data = Object.assign({}, tabledata.matches[mind]);
        dialogactive = true;
        // @ts-ignore
        dialogs .modal(ScoreForm, { match: data, number: mind + 1 })
            .then((d) => {
                if (typeof d !== "undefined") {
                    tabledata.matches[mind] = d;
                }
                dialogactive = false;
            });
    }

    function setTime() {
        if (dialogactive) return;
        dialogactive = true;
        timer.stop();
        // @ts-ignore
        dialogs.modal(TimerForm, { timercount: timer.count() }).then((d) => {
            if (typeof d != "undefined") {
                timer.reset(d);
            }
            dialogactive = false;
        });
    }

    function showtime(diff, pouse) {
        timestr = timer.toStr(diff);
        timerpouse = pouse;
    }
    var timer = Timer(showtime);
    timer.reset();

    onMount(() => {
        tabledata = create(path);
        setTimeout(() => {
            document.querySelector(".info").remove();
        }, 5000);
        window.document.addEventListener("keyup", (evt) => {
            console.log(evt.code);
            if (evt.code == "KeyS" && !dialogactive ) {
                timer.startstop();
            } else if (evt.code == "KeyR" && !dialogactive) {
                timer.reset();
            } else if (evt.code == "KeyH") {
                help();
            } else if (evt.code == "Digit1") {
                Score(0);
            } else if (evt.code == "Digit2") {
                Score(1);
            } else if (evt.code == "Digit3") {
                Score(2);
            } else if (evt.code == "Digit4") {
                Score(3);
            } else if (evt.code == "Digit5") {
                Score(4);
            } else if (evt.code == "Digit6") {
                Score(5);
            } else if (evt.code == "Digit7") {
                Score(6);
            } else if (evt.code == "KeyT") {
                setTime();
            } else if (evt.code == "KeyM" && ! dialogactive ) {
                nocursor = ! nocursor;
            } else if ( evt.code == "KeyP" ) {
                html2canvas(document.body).then(function(canvas) {
                    var imgdata = canvas.toDataURL("imge/png");
                    var a = document.createElement("a");
                    a.style.display = "none";
                    a.setAttribute("download","screenshot.png",)
                    a.href = imgdata;
                    document.body.append(a);
                    setTimeout(() => {
                        a.click();
                        document.body.removeChild(a);
                    }, 200);
                    
                });
            } else if ( evt.code == "KeyE" ) {
                dialogs.confirm("Do You want to exit?").then(()=>{
                    window.close();
                });
            }
        });
    });
</script>

<main>
    {#if tabledata != null }
    <div class="info">
        <h2>Kendo Board</h2>
        Press [F11] Key to switch on/off to full screen mode<br />
        Press [N] Key to start new board<br />
        Press [H] Key to open help menu<br />
        <span style="font-size: xx-small">This message will be disappear in 5 seconds</span>
    </div>

    <div class={'board '+(nocursor ? 'nocursor' : '')} data-line={tabledata.matches.length + ""}>
        <div class="head">
            <div class="white">
                <div class="flag">{tabledata.white}</div>
            </div>
            <div class="title">
                <div>
                    <span style="float:left;">{tabledata.title}</span>
                </div>
                <div>
                    <span
                        class={"timer " + (timerpouse ? "bilink" : "")}
                        style="float: right;">{timestr}</span>
                    
                </div>
            </div>
            <div class="red">
                <div class="flag">{tabledata.red}</div>
            </div>
        </div>
        <div class="body">
            {#each tabledata.matches as m, i}
                <div class="line {m.hikiwake == 'hikiwake' ? 'hikiwake' : ''}">
                    <div class="name white"><span>{m.white.name}</span></div>
                    <div class="white point">
                        {#if m.white.ippon1 !== null}
                            <img
                                src={figures[m.white.ippon1]}
                                alt={m.white.ippon1}
                            />
                        {/if}
                        {#if m.white.ippon2 !== null}
                            <img
                                src={figures[m.white.ippon2]}
                                alt={m.white.ippon2}
                            />
                        {/if}
                        {#if m.hikiwake == "white"}
                            <img src={figures.hantei} alt="Hantei" />
                        {/if}

                        {#if m.white.hansoku >= 1}
                            <img src={figures.hansoku} alt="Hansoku" />
                        {/if}
                        {#if m.white.hansoku >= 2}
                            <img src={figures.hansoku} alt="Hansoku" />
                        {/if}
                        {#if m.white.hansoku >= 3}
                            <img src={figures.hansoku} alt="Hansoku" />
                        {/if}
                        {#if m.white.hansoku == 4}
                            <img src={figures.hansoku} alt="Hansoku" />
                        {/if}
                    </div>
                    <div class="red point">
                        {#if m.red.ippon1 !== null}
                            <img
                                src={figures[m.red.ippon1]}
                                alt={m.red.ippon1}
                            />
                        {/if}
                        {#if m.red.ippon2 !== null}
                            <img
                                src={figures[m.red.ippon2]}
                                alt={m.red.ippon2}
                            />
                        {/if}
                        {#if m.hikiwake == "white"}
                            <img src={figures.hantei} alt="Hantei" />
                        {/if}

                        {#if m.red.hansoku >= 1}
                            <img src={figures.hansoku} alt="Hansoku" />
                        {/if}
                        {#if m.red.hansoku >= 2}
                            <img src={figures.hansoku} alt="Hansoku" />
                        {/if}
                        {#if m.red.hansoku >= 3}
                            <img src={figures.hansoku} alt="Hansoku" />
                        {/if}
                        {#if m.red.hansoku == 4}
                            <img src={figures.hansoku} alt="Hansoku" />
                        {/if}
                    </div>
                    <div class="name red">
                        <span>{m.red.name}</span>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    {/if}
</main>