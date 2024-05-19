import React from 'react';


interface Props {
  onDelete: () => void;
}

const DeleteStudentFromCourseButton: React.FC<Props> = ({ onDelete }) => {
  return <button onClick={onDelete}>Delete Student</button>;
};

export default DeleteStudentFromCourseButton;
