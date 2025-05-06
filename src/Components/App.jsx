import "../Styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import UserSaved from "./UserSaved.jsx"; 
import { SavedProvider } from "../Context/SavedContext.jsx";

function App() {
  return (
    <SavedProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/saved" element={<UserSaved />} /> {/* Add Saved page */}
        </Routes>
      </Router>
    </SavedProvider>
  );
}

export default App;
