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
      {role === "ROLE_STUDENT" && (
        <div>
          <h1><Link to={"/profile"}>{profileFullName}</Link></h1>
          <div>Role: {profileRole}</div>
          <div>Courses:</div>
          <ul>
            {courses.map((course, index) => (
              <li key={index}>{course.code} -- {course.name}</li>
            ))}
            <li>CS100: Programming Principles II</li>
          </ul>
        </div>
      )}

      {role === "ROLE_ADMIN" && (
        <div id="profile-admin-wrapper">
          <h1><Link to={"/profile"}>Kiryuxa Bas</Link></h1>
          <form action="/api/user/edit" method="POST">
              <p>
                Name: <input name="name" placeholder="Kiryuxa" required/>
              </p>
              <p>
                Surname: <input name="surname" placeholder="Bas" required/>
              </p>
              <p>
                Role: <input name="role" placeholder="student" required/><br />
              </p>
              <p>
                Courses:
                <ul>
                  <li>CS100: Programming Principles II</li>
                </ul>
              </p>
              <p>
                <input type="submit" value="Send"/>
              </p>
          </form>
        </div>
      )}

      {role === "ROLE_FACULTY" && (
        <div>
          <h1><Link to={"/profile"}>{profileFullName}</Link></h1>
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
      )}

    </div>
  );
};

export default Profile;
