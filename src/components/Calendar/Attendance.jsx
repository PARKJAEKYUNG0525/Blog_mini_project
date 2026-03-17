import {useState} from 'react';

const Attendance = ({ dateKey, attendance, setAttendance }) => {

  const checkAttendance = () => {
    setAttendance({
      ...attendance,
      [dateKey]: true
    });
  };

  return (
    <div>
      <p>날짜 : {dateKey}</p>

      <button onClick={checkAttendance}>
        출석체크
      </button>

      <p>
        상태 {attendance[dateKey] ? '출석' : '미출석'}
      </p>
    </div>
  );
};

export default Attendance;