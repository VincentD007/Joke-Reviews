// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.jsx"
import { BrowserRouter as Router } from 'react-router-dom'
import '../Styles/App.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Router>
    <App />
  </Router>
  // </StrictMode>
)
