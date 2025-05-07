import { useContext } from "react";
import LoggedInContext from '../Context/LoggedInContext.jsx' 
import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";

function NavBar() {
  let username = useContext(LoggedInContext).user.username;

  return (
    <nav className="navbar">
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "active" : "")}>Home
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive }) => (isActive ? "active" : "")}>Saved Memes
      </NavLink>
      <span className="username">&#128100; {username}</span>
    </nav>
  );
}

export default NavBar;
