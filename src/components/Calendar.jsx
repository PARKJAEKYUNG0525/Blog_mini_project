import React from 'react';
import MyCalendar from './MyCalendar';

const Calendar = () => {
    return (
        <div className="flex justify-center items-center h-screen text-3xl font-bold">
            캘린더
            <MyCalendar />
        </div>
    );
};

export default Calendar;
