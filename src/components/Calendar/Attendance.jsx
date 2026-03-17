import React from 'react';

const Attendance = () => {
    const [attendance,SetAttendance]=useState({});
    const dataKey = Date.toISOString().slice(0,10);

     const checkAttendance=()=>{
        const key = Date.toISOString().slice(0,10);

        SetAttendance({
            ...attendance,[key]:true
        });
     }
    return (
        <div>
            <button onClick={checkAttendance}>출석체크</button>
        </div>
    );
};

export default Attendance;