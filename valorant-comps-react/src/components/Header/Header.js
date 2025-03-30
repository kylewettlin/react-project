import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="site-header">
      <nav className="navbar">
        <div 
          className={`hamburger-menu ${isMenuOpen ? 'change' : ''}`} 
          onClick={toggleMenu}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/my-comps" className={({isActive}) => isActive ? 'active' : ''}>My Comps</NavLink></li>
          <li><NavLink to="/build-comps" className={({isActive}) => isActive ? 'active' : ''}>Build Comps</NavLink></li>
          <li><NavLink to="/recommended" className={({isActive}) => isActive ? 'active' : ''}>Recommended Comps</NavLink></li>
          <li><NavLink to="/agent-list" className={({isActive}) => isActive ? 'active' : ''}>Agent List</NavLink></li>
          <li><NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 