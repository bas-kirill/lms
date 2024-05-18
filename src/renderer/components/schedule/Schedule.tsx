import React, { useEffect, useState } from 'react';
import Header from '@components/header/Header';
import Login from '../login/Login';
import JwtPayload from '../../jwt/JwtPayload';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router';
import axios from 'axios';

export interface Courses {
  courses: Course[];
}

export interface Course {
  code: string;
  name: string;
  startDate: string;
  endDate: string;
}


const Schedule = () => {
  const { year, month, day } = useParams();
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const jwtRaw = window.localStorage.getItem('auth_token');
    if (jwtRaw === null) {
      setAuthenticated(false);
      return;
    }

    setAuthenticated(true);
    const jwt = jwtDecode<JwtPayload>(jwtRaw);
    setRole(jwt.sub);
  });

  useEffect(() => {
    const fetchDaySchedule = async () => {
      const response = await axios.get<Courses>(`http://localhost:8080/api/schedule/${year}/${month}/${day}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
        },
      });

      setCourses(response.data.courses);
    };

    fetchDaySchedule();
  }, []);

  if (!authenticated) {
    return (<Login />);
  }

  return (
    <div>
      <Header />
      <h1>{year}-{month}-{day}</h1>
      <div>
        <ul>
          {courses.map((course, index) => (
            <li key={index}><span>{course.name}</span></li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Schedule;