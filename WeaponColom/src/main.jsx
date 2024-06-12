import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { BrowserRouter } from 'react-router-dom'
import './components/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    
    <App />
  </ BrowserRouter>,
)
