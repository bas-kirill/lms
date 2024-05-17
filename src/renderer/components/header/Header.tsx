import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div id="dashboard-button-wrapper">
        <Link to={"/dashboard"}>Dashboard</Link>
      </div>
      <div>
        <Link to={"/profile"}>Profile</Link>
      </div>
    </header>
  );
};

export default Header;
