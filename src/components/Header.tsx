import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <a href="/" className="logo">
          <h1>Switchyard</h1>
          <span>Mechanical Keyboard Tracker</span>
        </a>
        <nav className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="/learn" className="nav-link nav-highlight">Learn</a>
        </nav>
      </div>
    </header>
  );
}
