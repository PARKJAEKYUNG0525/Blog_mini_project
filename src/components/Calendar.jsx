import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CalendarLib from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "./AuthContextPro";
import ScheduleForm from "./ScheduleForm";

//useUserData 만들기
const useUserData = (key, userKey) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!userKey) return;

    let allData = {};
    try {
      const saved = localStorage.getItem(key);
      allData = saved ? JSON.parse(saved) : {};
    } catch {
      allData = {};
    }

    setData(allData[userKey] || {});
  }, [userKey, key]);

  useEffect(() => {
    if (!userKey) return;

    let allData = {};
    try {
      const saved = localStorage.getItem(key);
      allData = saved ? JSON.parse(saved) : {};
    } catch {
      allData = {};
    }

    allData[userKey] = data;
    localStorage.setItem(key, JSON.stringify(allData));
  }, [data, userKey, key]);

  return [data, setData];
};

// 날짜 key 생성 함수
const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Calendar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const userKey = currentUser?.userId;

  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useUserData("attendance", userKey);
  const [schedules, setSchedules] = useUserData("schedules", userKey);

  useEffect(() => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const dateKey = getDateKey(date);

  // 캘린더 컴포넌트 (내부화)
  const MyCalendar = () => {
    return (
      <CalendarLib onChange={setDate} value={date} calendarType="gregory" />
    );
  };

  // 출석
  const Attendance = () => {
    const checkAttendance = () => {
      setAttendance({
        ...attendance,
        [dateKey]: true,
      });
    };

    return (
      <div>
        <p>날짜 : {dateKey}</p>

        <button
          onClick={checkAttendance}
          className="bg-blue-500 text-white px-4 py-1 rounded whitespace-nowrap
             hover:bg-blue-600 active:scale-95 transition"
        >
          출석체크
        </button>

        <p>상태 : {attendance[dateKey] ? "출석" : "미출석"}</p>
      </div>
    );
  };

  // 일정
  const ScheduleList = () => {
    const [isOpen, setIsOpen] = useState(false);

    const todaySchedules = schedules?.[dateKey] || [];

    return (
      <div>
        <h2>일정</h2>

        {todaySchedules.map((item) => (
          <p key={item.id}>{item.text}</p>
        ))}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-500 text-white px-4 py-1 rounded whitespace-nowrap
             hover:bg-blue-600 active:scale-95 transition"
        >
          글쓰기
        </button>

        {isOpen && (
          <div className="mt-2">
            <ScheduleForm
              dateKey={dateKey}
              schedules={schedules}
              setSchedules={setSchedules}
              close={() => setIsOpen(false)}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center p-10">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6 flex gap-6">
        {/* 왼쪽: 캘린더 */}
        <div className="w-2/3">
          <div className="border rounded-2xl p-6 shadow-sm bg-gray-50 flex justify-center">
            <MyCalendar />
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="w-1/3 flex flex-col gap-4">
          {/* 오늘 날짜 */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <p className="text-lg font-semibold">
              {new Date().toISOString().split("T")[0]}
            </p>
          </div>

          {/* 출석 */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <Attendance />
          </div>

          {/* 일정 */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <ScheduleList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
