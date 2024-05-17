import React from 'react';
import Header from '@components/header/Header';

const Courses = () => {
  return (
    <div className='courses-wrapper'>
      <Header />
      <h1>Courses</h1>
      <ul>
        <li>CS100 -- Programming Principles II</li>
        <li>CS200 -- Functional Programming</li>
      </ul>
    </div>
  );
};

export default Courses;