import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import Login from '@components/login/Login';
import JwtPayload from "../../jwt/JwtPayload";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export interface Profile {
  fullName: string
  role: string
  faculty: string
  courses: Course[]
}

export interface Course {
  code: string
  name: string
}


const Profile = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [profileFullName, setProfileFullName] = useState("");
  const [profileRole, setProfileRole] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [faculty, setFaculty] = useState("");

  useEffect(() => {
    const jwtRaw = window.localStorage.getItem("auth_token");
    if (jwtRaw === null) {
      setAuthenticated(false);
      return;
    }

    setAuthenticated(true);
    const jwt = jwtDecode<JwtPayload>(jwtRaw);
    setRole(jwt.role);
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get<Profile>('http://localhost:8080/api/profile', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
        },
      });
      setProfileFullName(response.data.fullName);
      setProfileRole(response.data.role);
      setCourses(response.data.courses);
      setFaculty(response.data.faculty);
      console.log(response);
    }

    fetchProfile();
  }, []);

  if (!authenticated) {
    return (<Login />);
  }

  return (
    <div>
      <Header role={role} />
      <h1><Link to={"/profile"}>{profileFullName}</Link></h1>
      <div>
        <div>Faculty: {faculty}</div>
        <div>Role: {profileRole}</div>
        {courses.length > 0 && (
          <div>
            <div>Courses:</div>
            <ul>
              {courses.map((course, index) => (
                <li key={index}>{course.code} -- {course.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
