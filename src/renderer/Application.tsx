import React from 'react';
import Login from './components/login/Login';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Schedule from './components/schedule/Schedule';
import Course from './components/course/Course';
import Courses from '@components/courses/Courses';
import User from '@components/users/User';
import Users from '@components/users/Users';


const queryClient = new QueryClient();

const Application: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule/:year/:month/:day" element={<Schedule />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseCode" element={<Course />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:username" element={<User />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Application;
