import { browser } from "$app/environment";
import { writable } from "svelte/store";

const getCodeSetting = localStorage.getItem('enableCode');
export const enableCode = writable<boolean>(getCodeSetting === 'false');

enableCode.subscribe(value => {
  if (browser) { 
    localStorage.setItem('enableCode', String(value));
  }
});