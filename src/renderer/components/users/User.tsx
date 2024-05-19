import React, { useEffect, useState } from 'react';
import JwtPayload from '@renderer/jwt/JwtPayload';
import Login from '@components/login/Login';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router';
import Header from '@components/header/Header';
import { Link } from 'react-router-dom';

export interface UserInfo {
  fullName: string;
  role: string;
  username: string;
  courses: Course[];
}

export interface Course {
  code: string;
  name: string;
}


const User = () => {
  const { username } = useParams();
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [userFullName, setUserUserFullName] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);

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
    console.log(username);
    const fetchUserInfo = async () => {
      const response = await axios.get<UserInfo>('http://localhost:8080/api/user', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
        },
        params: {
          login: username,
        },
      });

      setUserUserFullName(response.data.fullName);
      setUserRole(response.data.role);
      setCourses(response.data.courses);
    };

    fetchUserInfo();
  }, []);

  if (!authenticated) {
    return <Login />;
  }

  return (
    <div>
      {["ROLE_ADMIN", "ROLE_FACULTY"].includes(role) && (
        <div>
          <Header role={role} />
          <h1>{userFullName}</h1>
          Role: {userRole}<br />
          {courses.length > 0 && (
            <div>
              <p>Courses:</p>
              <ul>
                {courses.map((course, index) => (
                  <li key={index}><Link to={`/course/${course.code}`}>{course.code} -- {course.name}</Link></li>
                ))}
              </ul>
            </div>)}
        </div>)}
    </div>
  )
    ;
};

export default User;