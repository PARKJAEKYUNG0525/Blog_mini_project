import { useState } from 'react';
import MyCalendar from './Calendar/MyCalendar';
import Attendance from './Calendar/Attendance'

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const Calendar = () => {

  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});

  const dateKey = getDateKey(date); // ⭐ 여기서 생성

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <MyCalendar 
        date={date} 
        setDate={setDate} 
      />

      <Attendance
        dateKey={dateKey}   // ⭐ date 대신 key 내려줌
        attendance={attendance}
        setAttendance={setAttendance}
      />

    </div>
  );
};

export default Calendar;
