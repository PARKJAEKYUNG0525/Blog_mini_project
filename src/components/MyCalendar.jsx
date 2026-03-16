import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MyCalendar() {

  const [date, setDate] = useState(new Date());

  return (
    <Calendar
      onChange={setDate}
      value={date}
      calendarType="gregory"
    />
  );
}

export default MyCalendar;