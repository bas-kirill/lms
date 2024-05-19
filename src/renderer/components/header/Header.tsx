import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  role: string
}

const Header: React.FC<HeaderProps> = ({ role }) => {
  return (
    <header>
      <div id="dashboard-button-wrapper">
        <Link to={'/dashboard'}>Dashboard</Link>
      </div>
      {["ROLE_ADMIN", "ROLE_FACULTY"].includes(role) && (
        <div id='courses-button-wrapper'>
          <Link to={'/courses'}>Courses</Link>
        </div>
      )}
      <div>
        <Link to={'/profile'}>Profile</Link>
      </div>
    </header>
  );
};

export default Header;
