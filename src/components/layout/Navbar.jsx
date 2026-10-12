import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { 
  Tv, 
  Compass, 
  Bookmark, 
  Users, 
  BarChart2, 
  Sun, 
  Moon, 
  Search,
  Menu,
  X
} from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Discover', path: '/', icon: <Tv size={18} /> },
    { label: 'Browse', path: '/browse', icon: <Compass size={18} /> },
    { label: 'My Watchlist', path: '/my-list', icon: <Bookmark size={18} /> },
    { label: 'Clubs', path: '/clubs', icon: <Users size={18} /> },
    { label: 'Analytics', path: '/dashboard', icon: <BarChart2 size={18} /> },
  ];

  return (
    <header className="navbar glass">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-logo-icon">
            <span>⚡</span>
          </div>
          <span className="brand-text">Ani<span className="brand-highlight">Pulse</span></span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="navbar-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          <Link to="/browse" className="btn btn-ghost btn-icon" title="Quick Search">
            <Search size={20} />
          </Link>

          <button 
            className="btn btn-ghost btn-icon theme-toggle-btn" 
            onClick={toggleTheme} 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={20} className="icon-sun" /> : <Moon size={20} />}
          </button>

          <div className="user-avatar-pill">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="User profile" 
              className="user-avatar"
            />
          </div>

          <button 
            className="mobile-menu-toggle btn btn-ghost btn-icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer glass">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`mobile-nav-item ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
