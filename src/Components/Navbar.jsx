import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Saved Memes
      </NavLink>
      <span className="username">&#128100; Betty White</span>
    </nav>
  );
}

export default NavBar;