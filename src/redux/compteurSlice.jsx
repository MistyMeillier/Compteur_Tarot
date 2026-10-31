import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState = {
    display: 'nouvelle-partie',
    players: 0,
    playerList: [],
    currentScore: [{round: 0, score: [0, 0, 0]}],
    scoreList: [],
}

export const compteurSlice = createSlice({
    name: 'displayState',
    initialState,
    reducers: {
        nouvellePartie: (state) => {
            state.display = 'nouvelle-partie'
            state.playerList = []
            state.scoreList = []
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
            state.currentScore[0].score.push(0)
        },
        fivePlayer: (state) => {
            state.players = 5
            state.display = 'table-score'
            state.currentScore[0].score.push(0, 0)
        }, 
        setPlayerList: (state, action) => {
            state.playerList.push(action.payload)
        },
        updateScore: (state, action) => {
            state.currentScore[0].score = action.payload
        },
        updateScoreList: (state, action) => {
            state.scoreList.push(action.payload)
        }
    }
})

export const { nouvellePartie, nbrJoueur, tableScore, threePlayer, fourPlayer, fivePlayer, setPlayerList, updateScore, updateScoreList } = compteurSlice.actions
export default compteurSlice.reducer