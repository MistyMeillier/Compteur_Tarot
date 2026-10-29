import React from 'react'
import ReactDOM from 'react-dom/client'
import Compteur from './components/Compteur/Compteur'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './redux/Store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Compteur />
    </Provider>  
  </React.StrictMode>,
)
