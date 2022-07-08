import { writable } from 'svelte/store';

const STORAGE_NAME_DRAWING = "DRAWING";
const STORAGE_NAME_PLAYERS = "PLAYERS";
const STORAGE_NAME_MATCHES = "MATCHES";
function load(name,def) {
    var v = window.localStorage.getItem(name);
    return v ? JSON.parse(v) : def;
}

export const drawing = writable(load(STORAGE_NAME_DRAWING,[]));
export const playersStore = writable(load(STORAGE_NAME_PLAYERS,[]));
export const matches = writable(load(STORAGE_NAME_MATCHES,[]));

drawing.subscribe(v=>{
    window.localStorage.setItem(STORAGE_NAME_DRAWING,JSON.stringify(v));
});

playersStore.subscribe(v=>{
    window.localStorage.setItem(STORAGE_NAME_PLAYERS, JSON.stringify(v));
});

matches.subscribe(v=>{
    window.localStorage.setItem(STORAGE_NAME_MATCHES, JSON.stringify(v));
});



