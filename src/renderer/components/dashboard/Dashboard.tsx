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
import axios from 'axios';

interface Me {
  fullName: string,
}

const Dashboard = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [role, setRole] = useState('');
    const [fullName, setFullName] = useState('');

    useEffect(() => {
      const jwtRaw = window.localStorage.getItem('auth_token');

      if (jwtRaw === null) {
        setAuthenticated(false);
        return;
      }

      setAuthenticated(true);
      const jwt = jwtDecode<JwtPayload>(jwtRaw);
      setRole(jwt.role);
    });

    useEffect(() => {
      const fetchFullName = async () => {
        const response = await axios.get<Me>('http://localhost:8080/api/me', {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
          },
        });
        setFullName(response.data.fullName);
      };
      fetchFullName();
    }, []);

    if (!authenticated) {
      return (<Login />);
    }

    return (
      <div>
        <Header role={role} />
        {role === 'ROLE_STUDENT' && (
          <div>
            <h1>Welcome, {fullName}!</h1>
            <div id='student-dashboard-wrapper'>
              <Calendar />
              <Announcements />
            </div>
          </div>
        )}
        {role === 'ROLE_ADMIN' && (
          <div>
            <h1>Welcome, {fullName}!</h1>
            <div id='admin-dashboard-wrapper'>
              <Users />
            </div>
          </div>
        )}
        {role === 'ROLE_FACULTY' && (
          <div>
            <h1>Welcome, {fullName}!</h1>
            <div id='faculty-dashboard-wrapper'>
              <Calendar />
              <ActiveCourses />
            </div>
          </div>
        )}
      </div>
    );
  }
;

export default Dashboard;