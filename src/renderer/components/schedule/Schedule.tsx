import React, { useEffect, useState } from 'react';
import Header from '@components/header/Header';
import Login from '../login/Login';
import JwtPayload from "../../jwt/JwtPayload";
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router';

const Schedule = () => {
  const { year, month, day } = useParams();
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const jwtRaw = window.localStorage.getItem("auth_token");
    if (jwtRaw === null) {
      setAuthenticated(false);
      return;
    }

    setAuthenticated(true);
    const jwt = jwtDecode<JwtPayload>(jwtRaw);
    setRole(jwt.sub);
  });

  if (!authenticated) {
    return (<Login />);
  }

  return (
    <div>
      <Header />
      <h1>{year}-{month}-{day}</h1>
      <div>
        <p>
          <span>Monday</span>
          <div>
            <span>13:00 -- Programming Principles II</span>
          </div>
          <div>
            <span>14:00 -- Functional Programming</span>
          </div>
        </p>
        <p>
          <span>Monday</span>
        </p>
        <p>
          <span>Wednesday</span>
        </p>
        <p>
          <span>Thursday</span>
        </p>
        <p>
          <span>Friday</span>
        </p>
        <p>
          <span>Saturday</span>
        </p>
        <p>
          <span>Sunday</span>
        </p>
        <p>
          <span>Monday</span>
          <div>
            <span>13:00 -- Programming Principles II</span>
          </div>
          <div>
            <span>14:00 -- Functional Programming</span>
          </div>
        </p>
      </div>
    </div>
  );
}

export default Schedule;