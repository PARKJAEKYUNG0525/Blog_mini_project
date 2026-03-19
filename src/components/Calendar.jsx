import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CalendarLib from "react-calendar";
import { useAuth } from "./AuthContextPro";
import ScheduleForm from "./ScheduleForm";

const calendarCustomStyle = `
  .react-calendar { width: 100% !important; max-width: 100% !important; background: white; border: none !important; font-family: 'Pretendard', sans-serif; }
  .react-calendar__tile { height: 120px !important; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 15px !important; font-size: 1.2rem !important; transition: background 0.2s; }
  .react-calendar__month-view__weekdays { font-weight: 700; font-size: 1.1rem; padding-bottom: 15px; text-transform: none; }
  .react-calendar__navigation { display: flex; height: 60px; margin-bottom: 20px; }
  .react-calendar__navigation button { min-width: 50px; font-size: 1.6rem; font-weight: 800; color: #111827; }
  .react-calendar__tile--now { background: #f9fafb !important; color: #111827; font-weight: bold; border-radius: 16px; }
  .react-calendar__tile--active { background: #111827 !important; color: white !important; border-radius: 16px; }
  .react-calendar__tile:enabled:hover { background-color: #f3f4f6; border-radius: 16px; }
`;

const useUserData = (key, userKey) => {
  const [data, setData] = useState({});
  useEffect(() => {
    if (!userKey) return;
    try {
      const saved = localStorage.getItem(key);
      const allData = saved ? JSON.parse(saved) : {};
      setData(allData[userKey] || {});
    } catch { setData({}); }
  }, [userKey, key]);

  useEffect(() => {
    if (!userKey) return;
    const saved = localStorage.getItem(key);
    const allData = saved ? JSON.parse(saved) : {};
    allData[userKey] = data;
    localStorage.setItem(key, JSON.stringify(allData));
  }, [data, userKey, key]);
  return [data, setData];
};

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
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      alert("Please login to access this page.");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;
  const dateKey = getDateKey(date);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-start p-4 md:p-10">
      <style>{calendarCustomStyle}</style>
      
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 mt-4">
        
        {/* 왼쪽: 캘린더 */}
        <div className="flex-[2.5] bg-white rounded-[32px] border border-gray-100 p-10">
          <CalendarLib
            onChange={setDate}
            value={date}
            calendarType="gregory"
            formatDay={(locale, date) => date.getDate()}
            tileContent={({ date, view }) => {
              if (view !== "month") return null;
              const key = getDateKey(date);
              return attendance[key] ? (
                <div className="flex justify-center mt-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              ) : null;
            }}
          />
        </div>

        {/* 오른쪽: 상세 정보 */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-[32px] border border-gray-50">
            <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]">Selected Date</p>
            <p className="text-3xl font-black text-gray-900 leading-tight">
              {date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-gray-50 flex-grow min-h-[400px]">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4 mb-4">Daily Schedule</h2>
            
            <div className="space-y-3 mb-6">
              {(schedules?.[dateKey] || []).length > 0 ? (
                schedules[dateKey].map((item) => (
                  <div key={item.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm">
                    <p className="text-gray-700 font-medium">{item.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm py-10 text-center">There is no created schedule.</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setAttendance(prev => {
                  const next = { ...prev };
                  next[dateKey] ? delete next[dateKey] : next[dateKey] = true;
                  return next;
                })}
                className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 ${
                  attendance[dateKey] 
                    ? "bg-blue-50 text-blue-600 border-2 border-blue-100" 
                    : "bg-gray-900 text-white hover:bg-black shadow-lg"
                }`}
              >
                {attendance[dateKey] ? "Completed ✓" : "Attendance Check"}
              </button>
              
              {/* WRITE 버튼: 클릭하면 입력창이 열림 */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all"
              >
                {isOpen ? "Close" : "To add a schedule"}
              </button>

              {/* ✅ 3. isOpen이 true일 때만 ScheduleForm이 보임 */}
              {isOpen && (
                <div className="mt-2 p-4 border rounded-2xl bg-gray-50 animate-in fade-in zoom-in duration-200">
                  <ScheduleForm
                    dateKey={dateKey}
                    schedules={schedules}
                    setSchedules={setSchedules}
                    close={() => setIsOpen(false)} // 이제 에러 없이 작동합니다!
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;