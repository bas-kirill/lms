import React, { useEffect, useState } from 'react';
import Header from '@components/header/Header';
import { jwtDecode } from 'jwt-decode';
import JwtPayload from '@renderer/jwt/JwtPayload';
import axios from 'axios';
import "./Users.css";
import Login from '@components/login/Login';

export type Users = User[]

export interface User {
  username: string;
  fullName: string;
  role: string;
  faculty: string;
}


const Users = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [users, setUsers] = useState<Users>([]);

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
    const fetchUsers = async () => {
      const response = await axios.get<Users>('http://localhost:8080/api/users', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
        },
      });
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  if (!authenticated) {
    return (<Login />);
  }

  return (
    <div>
      <Header role={role} />
      <h1>Users</h1>
      <br/>
      {users.map((user, index) => (
        <div key={index} className="user-wrapper">
          <div>Username: {user.username}</div>
          <div>Fullname: {user.fullName}</div>
          <div>Role: {user.role}</div>
          <div>Faculty: {user.faculty}</div>
        </div>
      ))}
    </div>
  );
};

export default Users;