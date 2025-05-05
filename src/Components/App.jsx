import "../Styles/App.css"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./Login.jsx"
import Home from "./Home.jsx"

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home/:Username' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
