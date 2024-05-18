import React, { useEffect, useState } from 'react';
import axios from 'axios';

export type ActiveUsers = ActiveUser[]

export interface ActiveUser {
  fullName: string
}


const ActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      const response = await axios.get<ActiveUsers>("http://localhost:8080/api/users/active", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
        },
      });

      setActiveUsers(response.data);
    };

    fetchActiveUsers()
  }, []);

  return (
    <div className="active-users-wrapper">
      <h1>Active Users</h1>
      <ul>
        {activeUsers.map((user: ActiveUser) => (
          <li key={user.fullName}>{user.fullName}</li>
        ))}
      </ul>
    </div>
  );
}

export default ActiveUsers;