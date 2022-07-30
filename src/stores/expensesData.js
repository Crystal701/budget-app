import { writable } from "svelte/store";

export const expenses = writable([
    { id: 1, title: "Insurance", amount: 200 }
])