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
          <Link to="/home" className="nav-link">
            HOME
          </Link>
        </li>
        <li>
          <Link to="/favoritecoins" className="nav-link">
            Favorites
          </Link>
        </li>
        <li>
          <Link to="/news" className="nav-link">
            News
          </Link>
        </li>
        <li>
          <Link to="/editprofile" className="nav-link">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
