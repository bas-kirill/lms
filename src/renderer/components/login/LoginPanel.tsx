import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import LoginForm from './LoginForm';

const tryLogin = (user: User) => {
  return axios.post<TryLogin>("https://9a57e3c3-4bca-47ff-8820-6c2b85616b53.mock.pstmn.io/api/login", user);
};

const LoginPanel: React.FC = () => {
  useEffect(() => {
    document.title = "LMS -- Login"
  });

  const { mutate, isLoading, isError, error } = useMutation(tryLogin)

  return (
    <div>
      <LoginForm action={mutate} />
      {isLoading && (<div>Loading...</div>)}
      {isError && (<div>Failed to login: {error instanceof Error ? error.message : 'Unknown error'}</div>)}
    </div>
  );
};

export default LoginPanel;