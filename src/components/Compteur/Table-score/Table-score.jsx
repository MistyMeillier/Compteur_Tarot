import { useSelector } from 'react-redux'
import './Table-score.scss'


function TableScore() {
    const [list, setList] = React.useState()
    const playerNbr = useSelector(state => state.compteur.players)

    const addItem = (newItem) => {
        setList
    }

    return <div className='outertable'>
        <div className='outertable__row'></div>
    </div>
}

export default TableScore