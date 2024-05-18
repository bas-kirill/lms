import React from 'react';
import { useNavigate } from 'react-router-dom';


const CalendarCell = ({ year, month, day }: { year: number, month: number, day: number }) => {
  const navigate = useNavigate();

  const showSchedule = () => {
    navigate(`/schedule/${year}/${month}/${day}`);
  };

  return (
    <td className='calendar-cell-td' key={day}>
      <button onClick={showSchedule}>{day}</button>
    </td>
  );
};

export default CalendarCell;