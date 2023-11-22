import React, { useState } from "react";
import logo from "../assets/hub.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get("http://localhost:8000/api/logout", { withCredentials: true })
      .then((res) => {
        console.log(res.data.msg);
        navigate("/");
      })

      .catch((err) => console.log(err));
  };

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
        <li className="dropdownMenu ">
          <Link className="dropBTN nav-link">Profile</Link>
          <ul className="dropContent">
            <li onClick={() => navigate("/editprofile")}>Settings</li>
            <li onClick={() => handleLogout()}>Logout</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

{
  /* <li className="dropdown">
  <Link
    className="nav-link dropdown-toggle btn "
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Profile
  </Link>
  <ul className="dropdown-menu">
    <li>Settings</li>
    <li>Logout</li>
  </ul>
</li> */
}
