import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Rick and Morty SPA</h1>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
};

export default Header;
