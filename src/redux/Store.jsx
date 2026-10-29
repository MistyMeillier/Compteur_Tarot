import { configureStore } from "@reduxjs/toolkit";
import { compteurSlice } from "./compteurSlice";

export const store = configureStore ({
    reducer: {
        compteur: compteurSlice.reducer
    }
})