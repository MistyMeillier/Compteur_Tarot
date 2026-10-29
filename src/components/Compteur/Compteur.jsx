import './Compteur.scss'
import BtnNouvellePartie from './Btn-nouvelle-partie/Btn-nouvelle-partie'
import NbrJoueur from './Nbr-joueur/Nbr-Joueur'
import ListJoueur from './List-joueur/List-joueur'
import { useDispatch, useSelector } from 'react-redux'
import { nbrJoueur, nouvellePartie } from '../../redux/compteurSlice'

function Compteur() {
    let Cstate = useSelector((state) => state.compteur.display)
    console.log(Cstate)
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
        {
            Cstate === 'nbr-joueur' ? <NbrJoueur /> : null
        }
        {
            Cstate === 'table-score' ? <div>
                <ListJoueur />
            </div> : null
        }
        <button onClick={reset} className='reset'>
            <p>reset</p>
        </button>
    </div>
}

export default Compteur