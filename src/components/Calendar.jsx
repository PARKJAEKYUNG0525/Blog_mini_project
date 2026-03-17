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
    <div className="w-full min-h-screen bg-gray-100 flex justify-center p-10">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6 flex gap-6">
        
        {/* ✅ 왼쪽: 기존 캘린더 그대로 사용 */}
        <div className="w-2/3">
          <div className="border rounded-xl p-6 shadow-sm bg-gray-50">
            <MyCalendar 
              date={date} 
              setDate={setDate} 
              attendance={attendance}
            />
          </div>
        </div>

        {/* ✅ 오른쪽: 출석 + 일정 */}
        <div className="w-1/3 flex flex-col gap-4">

          {/* 날짜 */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <p className="text-lg font-semibold">
              {dateKey}
            </p>
          </div>

          {/* 출석 */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <Attendance
              dateKey={dateKey}   
              attendance={attendance}
              setAttendance={setAttendance}
            />
          </div>

          {/* 일정 */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <ScheduleList
              dateKey={dateKey}
              schedules={schedules}
              setSchedules={setSchedules}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Calendar;
