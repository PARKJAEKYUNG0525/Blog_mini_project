import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

  const MyCalendar = ({date, setDate}) =>{
    
    

    return(
      <Calendar onChange={setDate} value={date} calendarType="gregory" />
    );
  };


export default MyCalendar;