import { writable } from 'svelte/store';

export const interactiveSettings = writable({
    cursorType: ""
});