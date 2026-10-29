import './Compteur.scss'
import BtnNouvellePartie from './Btn-nouvelle-partie/Btn-nouvelle-partie'
import { useDispatch, useSelector } from 'react-redux'
import { nbrJoueur, nouvellePartie } from '../../redux/compteurSlice'

function Compteur() {
    let Cstate = useSelector((state) => state.compteur.display)
    const dispatch = useDispatch()

    const changeState = () => {
        if(Cstate === 'nouvelle-partie') {
            dispatch(nbrJoueur())
        }
    }

    const reset = () => {
        dispatch(nouvellePartie())
    }

    return <div className='outer'>
        {
            Cstate === 'nouvelle-partie' ? <BtnNouvellePartie onClick={() => changeState}/> : null
        }
        <button onClick={reset} className='reset'>
            <p>reset</p>
        </button>
    </div>
}

export default Compteur