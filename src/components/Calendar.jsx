import { useState } from 'react';
import MyCalendar from './Calendar/MyCalendar';
import Attendance from './Calendar/Attendance'
import ScheduleList from './Calendar/ScheduleList'

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const Calendar = () => {

  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});
  const [schedules, setSchedules] = useState({});

  const dateKey = getDateKey(date); // ⭐ 여기서 생성

  return (
    <div className="flex justify-center items-start gap-10 p-10">

    <div>
    <MyCalendar 
      date={date} 
      setDate={setDate} 
      attendance={attendance}
    />
    </div>

    <div className="flex flex-col gap-4">
      <Attendance
        dateKey={dateKey}   // ⭐ date 대신 key 내려줌
        attendance={attendance}
        setAttendance={setAttendance}
      />
      <ScheduleList
      dateKey={dateKey}
      schedules={schedules}
      setSchedules={setSchedules}
      />
    </div>

    </div>
  );
};

export default Calendar;
