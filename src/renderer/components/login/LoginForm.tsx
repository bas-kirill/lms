import React, { useState } from 'react';
import { MutateOptions } from 'react-query';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import User from '@components/login/User';
import Jwt from '@components/login/Jwt';

interface LoginFormAction {
  action: (variables: User, options?: MutateOptions<AxiosResponse<Jwt, never>, unknown, User>) => void;
}

const LoginForm = (props: LoginFormAction) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    const user: User = { username: login, password: password };

    props.action(
      user,
      {
        onSuccess: (data) => {
          window.localStorage.setItem("auth_token", data.data.token);
          navigate('/dashboard');
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <div id='login-panel'>
      <form action='http://localhost:61000/api/auth/login' method='POST' onSubmit={handleSubmit}>
        <input type='text' id='login' name='login' placeholder='Login' onChange={e => setLogin(e.target.value)} />
        <br />
        <input type='text' id='password' name='password' placeholder='Password'
               onChange={e => setPassword(e.target.value)} />
        <br />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default LoginForm;
