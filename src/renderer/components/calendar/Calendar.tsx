import React, { useState } from 'react';
import './Calendar.css';
import CalendarCell from '@components/calendar/CalendarCell'; // Importing CSS for styling

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const generateCalendar = () => {
    const calendar = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
          week.push(<td key={j}></td>);
        } else {
          week.push(<CalendarCell year={year} month={month + 1} day={dayCounter} />);
          dayCounter++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
    }
    return calendar;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className='calendar'>
      <div className='header'>
        <button onClick={goToPreviousMonth}>Previous</button>
        <h2>{monthNames[month]} {year}</h2>
        <button onClick={goToNextMonth}>Next</button>
      </div>
      <table>
        <thead>
        <tr>
          {daysOfWeek.map(day => <th key={day}>{day}</th>)}
        </tr>
        </thead>
        <tbody>
        {generateCalendar()}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
