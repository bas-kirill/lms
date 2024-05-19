import React, { FormEvent, useEffect, useState } from 'react';
import Header from '@components/header/Header';
import { jwtDecode } from 'jwt-decode';
import JwtPayload from '@renderer/jwt/JwtPayload';
import Login from '@components/login/Login';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import DeleteStudentFromCourseButton from '@components/course/DeleteStudentFromCourseButton';

export type Students = Student[]

export interface Student {
  fullName: string;
  login: string,
}

export interface CourseDetails {
  courseCode: string;
  name: string;
}

const Course = () => {
  const { courseCode } = useParams();
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [courseName, setCourseName] = useState<string>('');
  const [studentLoginToAdd, setStudentLoginToAdd] = useState<string>('');

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
    const fetchCourseDetails = async () => {
      const response = await axios.get<CourseDetails>(`http://localhost:8080/api/course/${courseCode}/details`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
        },
      });

      setCourseName(response.data.name);
    };

    fetchCourseDetails();
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

  const deleteStudentByLogin = async (login: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/course/${courseCode}/students/${login}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
          Accept: 'application/json',
        },
      });
      setStudents(students.filter(student => student.login !== login));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleAddStudentToCourseSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const addStudentToCourse = async () => {
      try {
        const response = await axios.post<Student>(`http://localhost:8080/api/course/${courseCode}`,
          {
            login: studentLoginToAdd,
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
            },
          });
        setStudentLoginToAdd(''); // clear text input field
        setStudents([...students, response.data])
      } catch (error) {
        console.error('Error adding student to course:', error);
      }
    };

    addStudentToCourse();
  };

  if (!authenticated) {
    return (<Login />);
  }

  return (
    <div>
      <Header role={role} />
      <h1>{courseCode} -- {courseName}</h1>
      <form action={`http://localhost:8080/api/course/${courseCode}`} method='POST'
            onSubmit={handleAddStudentToCourseSubmit}>
        <input
          type='text'
          placeholder='Student login'
          value={studentLoginToAdd}
          onChange={(e) => setStudentLoginToAdd(e.target.value)}
        />
        <button type='submit'>Add Student</button>
      </form>
      {students.length > 0 && (<div>
        Students:
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              <Link to={`/user/${student.login}`}>
                {student.fullName}
              </Link>
              <DeleteStudentFromCourseButton onDelete={() => deleteStudentByLogin(student.login)} />
            </li>
          ))}
        </ul>
      </div>)}

    </div>
  );
};

export default Course;