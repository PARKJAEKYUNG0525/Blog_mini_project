import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MyCalendar() {

  const [date, setDate] = useState(new Date());

  return (
    <div>
    <Calendar onChange={setDate} value={date} calendarType="gregory"/>
    <p>선택한 날짜 : {date.toISOString().slice(0,10)}</p>
    </div>
  );
}

export default MyCalendar;