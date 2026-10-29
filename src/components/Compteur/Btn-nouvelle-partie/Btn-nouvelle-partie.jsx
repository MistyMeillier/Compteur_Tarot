import { motion, scale } from "framer-motion"
import './Btn-nouvelle-partie.scss'


function BtnNouvellePartie({ onClick }) {

    const Hover = {
        scale: 1.05,
        transition: { duration: 0.2 },
    }

    const Tap = {
        scale: 0.95,
    }

    return <div className='outer'>
        <motion.div className='btn' whileHover={Hover} whileTap={Tap} onClick={onClick()}>
            <p className='btn__txt'>Nouvelle Partie</p>
        </motion.div>
    </div>
}

export default BtnNouvellePartie