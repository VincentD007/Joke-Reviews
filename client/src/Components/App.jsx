import "../Styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState} from 'react'
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import UserSaved from "./UserSaved.jsx"; 
import { SavedProvider } from "../Context/SavedContext.jsx";

function App() {
  const [user, setUser] = useState({});

  return (
    <SavedProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login setUser={setUser}/>} />
          <Route path="/home" element={<Home user={user}/>} />
          <Route path="/saved" element={<UserSaved user={user}/>} /> {/* Add Saved page */}
        </Routes>
      </Router>
    </SavedProvider>
  );
}

export default App;
