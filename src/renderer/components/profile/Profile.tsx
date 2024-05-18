import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import Login from '@components/login/Login';
import JwtPayload from "../../jwt/JwtPayload";
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
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
      {role === "student" && (
        <div>
          <h1><Link to={"/profile"}>Kiryuxa Bas</Link></h1>
          <div>Name: %s</div>
          <div>Surname: %s</div>
          <div>Role: %s</div>
          <div>Courses:</div>
          <ul>
            <li>CS100: Programming Principles II</li>
          </ul>
        </div>
      )}

      {role === "admin" && (
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

    </div>
  );
};

export default Profile;
