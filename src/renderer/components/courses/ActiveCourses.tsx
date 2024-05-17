import React from 'react';
import { Link } from 'react-router-dom';
import "./ActiveCourses.css";

const ActiveCourses = () => {
  return (
    <div className="active-users-wrapper">
      <h1>Active Courses</h1>
      <ul>
        <li><Link to="/course/CS100">CS100 -- Programming Principles II</Link></li>
        <li><Link to="/course/CS200">CS200 -- Functional Programming</Link></li>
      </ul>
    </div>
  );
};

export default ActiveCourses;