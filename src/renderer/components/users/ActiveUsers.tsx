import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export type ActiveUsers = ActiveUser[]

export interface ActiveUser {
  fullName: string,
  login: string,
}


const ActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      const response = await axios.get<ActiveUsers>('http://localhost:8080/api/users/active', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
        },
      });

      setActiveUsers(response.data);
    };

    fetchActiveUsers();
  }, []);

  return (
    <div className='active-users-wrapper'>
      <h1>Active Users</h1>
      <ul>
        {activeUsers.map((user: ActiveUser) => (
          <li key={user.fullName}><Link to={`/user/${user.login}`}>{user.fullName}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveUsers;