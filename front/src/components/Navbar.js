import React from "react";
import logo from "../assets/hub.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark px-4 ">
      <div>
        <img src={logo} alt="app_logo" />
      </div>
      <ul className="navbar gap-5">
        <li>
          <Link to="/home">HOME</Link>
        </li>
        <li>
          <Link to="/favoritecoins">Favorites</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/editprofile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
