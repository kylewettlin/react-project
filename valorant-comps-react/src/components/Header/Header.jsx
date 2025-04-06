import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen && 
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current && 
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Close menu on escape key
    const handleEscKey = (event) => {
      if (isMenuOpen && event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    // Handle body scroll lock on mobile
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="site-header">
      {/* Overlay for mobile menu background */}
      <div 
        className={`navbar-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      
      <nav className="navbar">
        <div 
          ref={hamburgerRef}
          className={`hamburger-menu ${isMenuOpen ? 'change' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          role="button"
          tabIndex={0}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <ul 
          ref={menuRef}
          className={`navbar-links ${isMenuOpen ? 'active' : ''}`}
        >
          <li>
            <NavLink 
              to="/" 
              onClick={handleLinkClick}
              className={({isActive}) => isActive ? 'active' : ''}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/my-comps" 
              onClick={handleLinkClick}
              className={({isActive}) => isActive ? 'active' : ''}
            >
              My Comps
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/build-comps" 
              onClick={handleLinkClick}
              className={({isActive}) => isActive ? 'active' : ''}
            >
              Build Comps
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/recommended" 
              onClick={handleLinkClick}
              className={({isActive}) => isActive ? 'active' : ''}
            >
              Recommended Comps
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/agent-list" 
              onClick={handleLinkClick}
              className={({isActive}) => isActive ? 'active' : ''}
            >
              Agent List
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              onClick={handleLinkClick}
              className={({isActive}) => isActive ? 'active' : ''}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 