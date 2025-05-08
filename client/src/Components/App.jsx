import "../Styles/App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import UserSaved from "./UserSaved.jsx";
import LoggedInContext from '../Context/LoggedInContext.jsx'
import ChatWindow from './ChatWindow.jsx' 
import { SavedProvider } from "../Context/SavedContext.jsx";

function App() {
  const [user, setUser] = useState({});

  return (

      <LoggedInContext.Provider value={{ user, setUser }}>
        <SavedProvider >
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/saved" element={<UserSaved/>}/> 
              <Route path="/GlobalChat" element={<ChatWindow/>}/>
            </Routes>
        </SavedProvider >
      </LoggedInContext.Provider>
  );
}

export default App;
