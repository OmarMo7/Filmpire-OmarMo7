import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './components/App.jsx'
import store from './app/store'
import './index.css'
import ToggleColorsMode from './components/utils/ToggleColorsMode.js'


ReactDOM.render(
  <Provider store={store}>
    <ToggleColorsMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorsMode>
  </Provider>
  , document.getElementById("root"))