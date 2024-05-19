import React, { useEffect, useState } from 'react';
import Header from '@components/header/Header';
import { jwtDecode } from 'jwt-decode';
import JwtPayload from '@renderer/jwt/JwtPayload';
import Login from '@components/login/Login';
import { Link } from 'react-router-dom';
import axios from 'axios';

export type Courses = Course[]

export interface Course {
  code: string;
  name: string;
}


const Courses = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState('');
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
    const fetchCourses = async () => {
      const response = await axios.get<Courses>('http://localhost:8080/api/courses', {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
          },
        },
      );

      setCourses(response.data);
    };

    fetchCourses();
  }, []);

  if (!authenticated) {
    return (<Login />);
  }

  return (
    <div className='courses-wrapper'>
      <Header role={role} />
      <h1>Courses</h1>
      <ul>
        {courses.map((course, index) => (
          <li key={index}><Link to={`/course/${course.code}`}>{course.code} -- {course.name}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;