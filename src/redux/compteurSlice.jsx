import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    display: 'nouvelle-partie',
    players: 0
}

export const compteurSlice = createSlice({
    name: 'displayState',
    initialState,
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
        threePlayer: (state) => {
            state.players = 3
            state.display = 'table-score'
        },
        fourPlayer: (state) => {
            state.players = 4
            state.display = 'table-score'
        },
        fivePlayer: (state) => {
            state.players = 5
            state.display = 'table-score'
        },
    }
})

export const { nouvellePartie, nbrJoueur, tableScore, threePlayer, fourPlayer, fivePlayer } = compteurSlice.actions
export default compteurSlice.reducer