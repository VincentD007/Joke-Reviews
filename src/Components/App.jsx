import { useState } from 'react'
import "../Styles/App.css"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from "./Login.jsx"

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
