import React, { useEffect, useState } from 'react';
import Header from '@components/header/Header';
import { jwtDecode } from 'jwt-decode';
import JwtPayload from '@renderer/jwt/JwtPayload';
import Login from '@components/login/Login';
import axios from 'axios';
import { useParams } from 'react-router';


export type Students = Student[]

export interface Student {
  fullName: string;
}


const Course = () => {
  const { courseCode } = useParams();
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [students, setStudents] = useState<Student[]>([]);

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
    const fetchCourseStudents = async () => {
      const response = await axios.get<Students>(`http://localhost:8080/api/course/${courseCode}/students`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
          },
        },
      );
      setStudents(response.data);
    };

    fetchCourseStudents();
  }, []);

  if (!authenticated) {
    return (<Login />);
  }

  return (
    <div>
      <Header role={role} />
      <h1>CS100 -- Programming Principles II</h1>
      Students:
      <ul>
        {students.map((student, index) => (
          <li key={index}>{student.fullName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Course;