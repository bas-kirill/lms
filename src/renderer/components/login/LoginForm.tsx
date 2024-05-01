import React from "react";
import { MutateOptions } from 'react-query';
import { AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom";

interface LoginFormAction {
  action: (variables: User, options?: MutateOptions<AxiosResponse<TryLogin, never>, unknown, User>) => void
}

const LoginForm = (props: LoginFormAction) => {
  const navigate = useNavigate();

  return (
    <div id='login-panel'>
      <form action='http://localhost:4813/api/login' method='post' onSubmit={event => {
        event.preventDefault();
        const loginFormDiv = document.getElementById("login");
        const passwordFormDiv = document.getElementById("password");

        const loginValue = loginFormDiv.nodeValue;
        const passwordValue = passwordFormDiv.nodeValue;

        const user: User = {
          login: loginValue,
          password: passwordValue,
        };

        props.action(user,
          {
            onSuccess: (data) => {
              console.log(data);
              // https://stackoverflow.com/questions/70378978/react-typescript-module-react-router-dom-has-no-exported-member-routecompo
              navigate("/dashboard");
            },
            onError: (error) => {
              console.log(error);
            },
          });
      }}>
        <input type='text' id='login' name='login' placeholder='Login' />
        <br />
        <input type='text' id='password' name='password' placeholder='Password' />
        <br />
        <input type='submit' value='Submit' />
      </form>
    </div>
  )
}

export default LoginForm;
