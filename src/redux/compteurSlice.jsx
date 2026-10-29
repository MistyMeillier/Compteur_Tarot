import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    display: 'nouvelle-partie'
}

export const compteurSlice = createSlice({
    name: 'displayState',
    initialState: {initialState},
    reducers: {
        nouvellePartie: (state) => {
            state.display = 'nouvelle-partie'
        },
        nbrJoueur: (state) => {
            state.display = 'nbr-joueur'
        },
        tableScore: (state) => {
            state.display = 'table-score'
        },
        
    }
})

export const { nouvellePartie, nbrJoueur, tableScore } = compteurSlice.actions
export default compteurSlice.reducer