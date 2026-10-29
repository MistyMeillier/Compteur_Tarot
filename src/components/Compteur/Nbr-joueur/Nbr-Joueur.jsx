import { useDispatch } from 'react-redux'
import './Nbr-joueur.scss'
import { motion, scale } from "framer-motion"
import { threePlayer, fourPlayer, fivePlayer } from '../../../redux/compteurSlice'

function NbrJoueur() {
    const dispatch = useDispatch()

    const Hover = {
        scale: 1.05,
        transition: { duration: 0.2 },
    }

    const Tap = {
        scale: 0.95,
    }

    const three = () => {
        dispatch(threePlayer())
    }
    const four = () => {
        dispatch(fourPlayer())
    }
    const five = () => {
        dispatch(fivePlayer())
    }

    return <div className = 'outer'>
        <h1 className='playerNbrTitle'>Nombre de joueurs</h1>
        <motion.div className = 'btnP' whileHover={Hover} whileTap={Tap} onClick={three}>
            <p className = 'btnP__txt'>3</p> 
        </motion.div>
        <motion.div className = 'btnP' whileHover={Hover} whileTap={Tap} onClick={four}>
            <p className = 'btnP__txt'>4</p> 
        </motion.div>
        <motion.div className = 'btnP' whileHover={Hover} whileTap={Tap} onClick={five}>
            <p className = 'btnP__txt'>5</p> 
        </motion.div>
    </div>
}

export default NbrJoueur