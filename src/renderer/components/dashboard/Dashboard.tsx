import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import { jwtDecode } from 'jwt-decode';
import Login from '../login/Login';
import Calendar from '@components/calendar/Calendar';
import Announcements from '@components/announcements/Announcements';
import './Dashboard.css';
import Users from '@components/users/ActiveUsers';
import JwtPayload from '../../jwt/JwtPayload';
import ActiveCourses from '@components/courses/ActiveCourses';

const Dashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    // const jwtRaw = window.localStorage.getItem("auth_token");
    const jwtRaw = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZmFjdWx0eSIsImV4cCI6MTc0NjU1NTcxMn0.rXbobgqtlI2Ad1eiL0dldj6BSdX_17tOQC51QW7w6Pk';
    // jwt server secret key: abacaba
    if (jwtRaw === null) {
      setAuthenticated(false);
      return;
    }

    setAuthenticated(true);
    const jwt = jwtDecode<JwtPayload>(jwtRaw);
    console.log(jwt);
    setRole(jwt.role);
  });

  if (!authenticated) {
    return (<Login />);
  }

  return (
    <div>
      <Header />
      {role === 'student' && (
        <div>
          <h1>Welcome, Romich Mishura!</h1>
          <div id='student-dashboard-wrapper'>
            <Calendar />
            <Announcements />
          </div>
        </div>
      )}
      {role === 'admin' && (
        <div>
          <h1>Welcome, administrator</h1>
          <div id='admin-dashboard-wrapper'>
            <Users />
          </div>
        </div>
      )}
      {role === 'faculty' && (
        <div>
          <h1>Welcome, Computer Science Faculty</h1>
          <div id="faculty-dashboard-wrapper">
            <ActiveCourses />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;