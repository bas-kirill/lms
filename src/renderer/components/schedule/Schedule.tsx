import React, { useEffect, useState } from 'react';
import Header from '@components/header/Header';
import Login from '../login/Login';
import JwtPayload from "../../jwt/JwtPayload";
import { jwtDecode } from 'jwt-decode';

const Schedule = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    // const jwtRaw = window.localStorage.getItem("auth_token");
    const jwtRaw = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NDY1NTU3MTJ9.9u1MaV3-WcOE3i0y7MvsNHuLW-rSv0t2TJhx_A9N6eQ";
    // jwt server secret key: abacaba
    if (jwtRaw === null) {
      setAuthenticated(false);
      return;
    }

    setAuthenticated(true);
    const jwt = jwtDecode<JwtPayload>(jwtRaw);
    console.log(jwt);
    setRole(jwt.role);
  });

  if (!authenticated) {
    return (<Login />);
  }

  return (
    <div>
      <Header />
      <h1>2024-05-15</h1>
      <div>
        <p>
          <span>Monday</span> | <button>Add</button>
          <div>
            <span>13:00 -- Programming Principles II</span> {role==="admin" && (
            <span>
              | <button>Edit</button> | <button>Remove</button>
            </span>
          )}
          </div>
          <div>
            <span>14:00 -- Functional Programming</span> {role==="admin" && (
            <span>
              | <button>Edit</button> | <button>Remove</button>
            </span>
          )}
          </div>
        </p>
        <p>
          <span>Monday</span> | <button>Add</button>
        </p>
        <p>
          <span>Wednesday</span> | <button>Add</button>
        </p>
        <p>
          <span>Thursday</span> | <button>Add</button>
        </p>
        <p>
          <span>Friday</span> | <button>Add</button>
        </p>
        <p>
          <span>Saturday</span> | <button>Add</button>
        </p>
        <p>
          <span>Sunday</span> | <button>Add</button>
        </p>
        <p>
          <span>Monday</span> | <button>Add</button>
          <div>
            <span>13:00 -- Programming Principles II</span> {role==="admin" && (
            <span>
              | <button>Edit</button> | <button>Remove</button>
            </span>
          )}
          </div>
          <div>
            <span>14:00 -- Functional Programming</span> {role==="admin" && (
            <span>
              | <button>Edit</button> | <button>Remove</button>
            </span>
          )}
          </div>
        </p>
      </div>
    </div>
  );
}

export default Schedule;