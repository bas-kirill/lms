import React, { useEffect, useState } from 'react';
import Header from '@components/header/Header';
import { jwtDecode } from 'jwt-decode';
import JwtPayload from '@renderer/jwt/JwtPayload';
import Login from '@components/login/Login';

const Course = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState('');

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

  if (!authenticated) {
    return (<Login />);
  }

  return (
    <div>
      <Header role={role} />
      <h1>CS100 -- Programming Principles II</h1>
      Students:
      <ul>
        <li>Kiryuxa Bas (clickable)</li>
      </ul>
    </div>
  );
}

export default Course;