import { useDispatch, useSelector } from 'react-redux'
import { motion, scale } from "framer-motion"
import { setPlayerList } from '../../../redux/compteurSlice'
import React from 'react'
import './List-joueur.scss'

function ListJoueur() {
    const dispatch = useDispatch()

    const [list, setList] = React.useState(useSelector(state => state.compteur.playerList))
    const [name, setName] = React.useState('');
    const playerNbr = useSelector(state => state.compteur.players)

    const Hover = {
        scale: 1.05,
        transition: { duration: 0.2 },
    }

    const Tap = {
        scale: 0.95,
    }

    const handleChange = (event) => {
        setName(event.target.value)
    }

    const handleAdd = () => {
        const newList = list.concat({ name })
        setList(newList)
        dispatch(setPlayerList({ name }))
        setName('')
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAdd()
        }
    }

    return <div className='outerListPlayer'>
        { list.length < playerNbr ? 
            <div className='addNameOuter'>
                <div className='addNameOuter__box'>
                    <input className='addNameOuter__box__input' onKeyDown={handleKeyDown} type='text' value={name} onChange={handleChange}/>
                    <motion.div className='addNameOuter__box__button' onClick={handleAdd} whileHover={Hover} whileTap={Tap}>Ajouter</motion.div> 
                </div>   
            </div>: null
        }
        <div className='outerListPlayer__nameList'>
            { list.map((name, index) => (
                <div key={index} className='outerListPlayer__nameList__nameBox'>
                    <p className='outerListPlayer__nameList__nameBox__name'>{list[index].name}</p>
                </div>
            ))

            }
        </div>
    </div>
}

export default ListJoueur