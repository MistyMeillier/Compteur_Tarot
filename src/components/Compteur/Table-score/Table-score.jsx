import { useDispatch, useSelector } from 'react-redux'
import './Table-score.scss'
import React, { useEffect } from 'react'
import { motion, scale } from "framer-motion"
import { updateScore, updateScoreList } from '../../../redux/compteurSlice'


function TableScore() {
    const dispatch = useDispatch()
    const players = useSelector(state => state.compteur.playerList)
    const playerNbr = useSelector(state => state.compteur.players)
    const currentScore = useSelector(state => state.compteur.currentScore)
    const storedList = useSelector(state => state.compteur.scoreList)

    const[scoreInput, setScoreInput] = React.useState('')

    const initialData = []
    const [scoreList, setScoreList] = React.useState(storedList ? storedList : initialData)
    const [roundData, setRoundData] = React.useState(initialData)
    const [state, setState] = React.useState('nouvelle-manche')

    const Hover = {
        scale: 1.05,
        transition: { duration: 0.2 },
    }

    const Tap = {
        scale: 0.95,
    }

    const nouvelleMancheClick = () => {
        setRoundData(initialData)
        setState('preneur')
    }

    const preneurClick = (ID) => {
        setRoundData(prevState => ({ ...prevState, preneurID: ID }))
        if (playerNbr === 5) {
            setState('appele')
        } else {
            setState('contrat')
        }
        
    }

    const appeleClick = (ID) => {
        setRoundData(prevState => ({ ...prevState, appeleID: ID }))
        setState('contrat')
    }

    const contratClick = (contrat) => {
        setRoundData(prevState => ({ ...prevState, contrat: contrat }))
        setState('bout')
    }

    const boutClick = (nbrBout) => {
        setRoundData(prevState => ({ ...prevState, bout: nbrBout }))
        setState('score')
    }

    const handleChange = (event) => {
        setScoreInput(event.target.value)
    }

    const scoreClick = () => {
        BigBrain(parseInt(scoreInput, 10))
        setState('nouvelle-manche')
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            scoreClick()
        }
    }

    /*const bonusClick = (bonus) => {
        setRoundData(prevState => ({ ...prevState, bonus: bonus }))
        
        setState('nouvelle-manche')
    }*/

    const handleClick = (data) => {
        switch (state) {
            case 'nouvelle-manche': nouvelleMancheClick(); break;
            case 'preneur':  preneurClick(data); break;
            case 'appele': appeleClick(data); break;
            case 'contrat': contratClick(data); break;
            case 'bout': boutClick(data); break;
            case 'score': scoreClick(); break;
        }
    }

    const BigBrain = (score) => {
        let newScore = []
        let objectif = 0

        switch (roundData.bout) {
            case 0: objectif = 56; break;
            case 1: objectif = 51; break;
            case 2: objectif = 41; break;
            case 3: objectif = 36; break;
        }

        let ecart = score - objectif
        let toAdd = 25

        if (ecart < 0) {
            toAdd = -25
        }

        let baseScore = (ecart + toAdd) * roundData.contrat

        for (let i = 0; i < currentScore[0].score.length; i++) {
            switch (playerNbr) {
                case 3: if (i === roundData.preneurID) {
                    let score = baseScore * 2 + currentScore[0].score[i]
                    newScore.push(score)
                } else {
                    let score = - baseScore + currentScore[0].score[i]
                    newScore.push(score)
                }; break;

                case 4: if (i === roundData.preneurID) {
                    let score = baseScore * 3 + currentScore[0].score[i]
                    newScore.push(score)
                } else {
                    let score = - baseScore + currentScore[0].score[i]
                    newScore.push(score)
                }; break;

                case 5: if (i === roundData.preneurID) {
                    if (i === roundData.appeleID) {
                        let score = baseScore * 4 + currentScore[0].score[i]
                        newScore.push(score)
                    } else {
                        let score = baseScore * 2 + currentScore[0].score[i]
                        newScore.push(score)
                    }
                } else if (i === roundData.appeleID) {
                    let score = baseScore + currentScore[0].score[i]
                    newScore.push(score)
                } else {
                    let score = - baseScore + currentScore[0].score[i]
                    newScore.push(score)
                }; break;
            }
        }

        dispatch(updateScore( newScore ))
        dispatch(updateScoreList( newScore ))
        setScoreList([...scoreList, newScore])
    }

    const renderButtons = () => {
        if (players.length == playerNbr) {
            switch (state) {
                case 'nouvelle-manche': return <motion.div className='outertable__outerbtns__newBtn' onClick={handleClick} whileHover={Hover} whileTap={Tap}>
                    <p className='outertable__outerbtns__newBtn__txt'>Nouvelle manche</p>
                </motion.div>;

                case 'preneur': return <div className='outertable__outerbtns__preneur'>
                    <h2 className='outertable__outerbtns__preneur__title'>Preneur</h2>
                    <div className='outertable__outerbtns__preneur__outerBtn'>
                        {players.map((name, index) => (
                            <motion.div className='outertable__outerbtns__preneur__outerBtn__btn' onClick={() => handleClick(index)} whileHover={Hover} whileTap={Tap}>
                                <p className='outertable__outerbtns__preneur__outerBtn__btn__txt'>{players[index].name}</p>
                            </motion.div>
                        ))}
                    </div>
                    
                </div>;

                case 'appele': return <div className='outertable__outerbtns__appele'>
                    <h2 className='outertable__outerbtns__appele__title'>Joueur appelé</h2>
                    <div className='outertable__outerbtns__appele__outerBtn'>
                        {players.map((name, index) => (
                            <motion.div className='outertable__outerbtns__appele__outerBtn__btn' onClick={() => handleClick(index)} whileHover={Hover} whileTap={Tap}>
                                <p className='outertable__outerbtns__appele__outerBtn__btn__txt'>{players[index].name}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>;

                case 'contrat': return <div className='outertable__outerbtns__contrat'>
                    <h2 className='outertable__outerbtns__contrat__title'>Contrat</h2>
                    <div className='outertable__outerbtns__contrat__btns'>
                        <motion.div className='outertable__outerbtns__contrat__btns__btn' onClick={() => handleClick(1)} whileHover={Hover} whileTap={Tap}>
                            <p className='outertable__outerbtns__contrat__btns__btn__txt'>Petite</p>
                        </motion.div>
                        <motion.div className='outertable__outerbtns__contrat__btns__btn' onClick={() => handleClick(2)} whileHover={Hover} whileTap={Tap}>
                            <p className='outertable__outerbtns__contrat__btns__btn__txt'>Garde</p>
                        </motion.div>
                        <motion.div className='outertable__outerbtns__contrat__btns__btn' onClick={() => handleClick(4)} whileHover={Hover} whileTap={Tap}>
                            <p className='outertable__outerbtns__contrat__btns__btn__txt'>Garde sans</p>
                        </motion.div>
                        <motion.div className='outertable__outerbtns__contrat__btns__btn' onClick={() => handleClick(6)} whileHover={Hover} whileTap={Tap}>
                            <p className='outertable__outerbtns__contrat__btns__btn__txt'>Garde contre</p>
                        </motion.div>
                    </div>
                </div>;

                case 'bout': return <div className='outertable__outerbtns__bout'>
                    <h2 className='outertable__outerbtns__bout__title'>Combien de bouts?</h2>
                    <div className='outertable__outerbtns__bout__btns'>
                        <motion.div className='outertable__outerbtns__bout__btns__btn' onClick={() => handleClick(0)} whileHover={Hover} whileTap={Tap}>
                            <p className='outertable__outerbtns__bout__btns__btn__txt'>0</p>
                        </motion.div>
                        <motion.div className='outertable__outerbtns__bout__btns__btn' onClick={() => handleClick(1)} whileHover={Hover} whileTap={Tap}>
                            <p className='outertable__outerbtns__bout__btns__btn__txt'>1</p>
                        </motion.div>
                        <motion.div className='outertable__outerbtns__bout__btns__btn' onClick={() => handleClick(2)} whileHover={Hover} whileTap={Tap}>
                            <p className='outertable__outerbtns__bout__btns__btn__txt'>2</p>
                        </motion.div>
                        <motion.div className='outertable__outerbtns__bout__btns__btn' onClick={() => handleClick(3)} whileHover={Hover} whileTap={Tap}>
                            <p className='outertable__outerbtns__bout__btns__btn__txt'>3</p>
                        </motion.div>
                    </div>
                </div>;

                case 'score': return <div className='outertable__outerbtns__score'>
                    <h2 className='outertable__outerbtns__score__title'>Score</h2>
                    <div className='outertable__outerbtns__score__outerinput'>
                        <input className='outertable__outerbtns__score__outerinput__input' onKeyDown={handleKeyDown} onChange={handleChange} />
                        <motion.div className='outertable__outerbtns__score__outerinput__btn' onClick={handleClick} whileHover={Hover} whileTap={Tap}>
                            <p className='outertable__outerbtns__score__outerinput__btn__txt'>Valider</p>
                        </motion.div>
                    </div>
                </div>;

                {/* case 'bonus': return <div className='outertable__outerbtns__bonus'>
                    <h2 className='outertable__outerbtns__bonus__title'>Bonus</h2>
                    <div className='outertable__outerbtns__bonus__btns'>
                        <motion.div className='outertable__outerbtns__bonus__btns__btn' onClick={() => handleClick(true)} whileHover={Hover} whileTap={Tap}>
                            <p className='outertable__outerbtns__bonus__btns__btn__txt'>Petit au bout</p>
                        </motion.div>
                        <motion.div className='outertable__outerbtns__bonus__btns__btn' onClick={() => handleClick(false)} whileHover={Hover} whileTap={Tap}>
                            <p className='outertable__outerbtns__bonus__btns__btn__txt'>Non</p>
                        </motion.div>
                    </div>
                </div>; */}
            }
        }  
    }

    return <div className='outertable'>
        <div className='outertable__table'>
            { scoreList.map((round, index) => (
                <div key={index} className='outertable__table__row'>
                    {
                        round.map((score, index) => (
                            <div key={index} className='outertable__table__row__case'>
                                <p className='outertable__table__row__case__txt'>{score}</p>
                            </div>
                        ))
                    }
                </div>
            ))
            }
        </div>
        <div className='outertable__outerbtns'>
            {renderButtons()}
        </div>
    </div>
}

export default TableScore