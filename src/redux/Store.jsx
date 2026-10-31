import { configureStore } from "@reduxjs/toolkit";
import { compteurSlice } from "./compteurSlice";

const persistedState = localStorage.getItem('myStore') ? JSON.parse(localStorage.getItem('myStore')) : undefined;

export const store = configureStore ({
    reducer: {
        compteur: compteurSlice.reducer
    },
    preloadedState: persistedState
})

store.subscribe(() => {
    localStorage.setItem('myStore', JSON.stringify(store.getState()))
})

