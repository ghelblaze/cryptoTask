import React from 'react'
import logo from '../assets/hub.png'

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src={logo} alt="app_logo" />
      </div>
      <ul>
        <li>Home</li>
        <li>Favorites</li>
        <li>News</li>
        <li>Profile</li>
      </ul>
    </nav>
  )
}

export default Navbar