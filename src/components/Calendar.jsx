import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CalendarLib from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "./AuthContextPro";

//useUserData 만들기
  const useUserData = (key, userKey) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!userKey) return;

    const allData = JSON.parse(localStorage.getItem(key)) || {};
    setData(allData[userKey] || {});
  }, [userKey, key]);

  useEffect(() => {
    if (!userKey) return;

    const allData = JSON.parse(localStorage.getItem(key)) || {};
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
  //로그인
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if(!currentUser) return null;
  

  //user값 정의
  const userKey = currentUser.userId;
  

  //date 정의
  const [date, setDate] = useState(new Date());

  const [attendance, setAttendance] = useUserData("attendance", userKey);
  const [schedules, setSchedules] = useUserData("schedules", userKey);
  
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

        <button onClick={checkAttendance}>
          [출석체크]
        </button>

        <p>상태 : {attendance[dateKey] ? "출석" : "미출석"}</p>
      </div>
    );
  };

  // 일정
  const ScheduleList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");

    const todaySchedules = schedules[dateKey] || [];

    const addSchedule = () => {
      if (!input.trim()) return;

      const newItem = {
        id: Date.now(),
        text: input,
      };

      setSchedules({
        ...schedules,
        [dateKey]: [...todaySchedules, newItem],
      });

      setInput("");
      setIsOpen(false);
    };

    return (
      <div>
        <h3>일정</h3>

        {todaySchedules.map((item) => (
          <p key={item.id}>{item.text}</p>
        ))}

        <button onClick={() => setIsOpen(!isOpen)}>[글쓰기]</button>

        {isOpen && (
          <div className="flex gap-2 mt-2">
            <input
              className="border p-1 rounded w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSchedule();
                }
              }}
              placeholder="일정 입력"
            />
            <button
              className="bg-blue-500 text-white px-3 rounded"
              onClick={addSchedule}
            >
              추가
            </button>
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
