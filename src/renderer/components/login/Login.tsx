import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import LoginForm from './LoginForm';
import User from '@components/login/User';
import Jwt from '@components/login/Jwt';

const tryLogin = (user: User) => {
  return axios.post<Jwt>("http://localhost:8080/api/auth/login", user);
};

const Login: React.FC = () => {
  useEffect(() => {
    document.title = "LMS -- Login"
  }, []);

  const { mutate, isLoading, isError, error } = useMutation(tryLogin)

  return (
    <div>
      <LoginForm action={mutate} />
      {isLoading && (<div>Loading...</div>)}
      {isError && (<div>Failed to login: {error instanceof Error ? error.message : 'Unknown error'}</div>)}
    </div>
  );
};

export default Login;