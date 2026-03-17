import { useState } from 'react';
import ScheduleForm from './SchduleForm';

const ScheduleList = ({ dateKey, schedules, setSchedules }) => {

  const [isOpen, setIsOpen] = useState(false);

  const todaySchedules = schedules[dateKey] || [];

  return (
    <div>
      <h3>일정</h3>

      {todaySchedules.map((item) => (
        <p key={item.id}>{item.text}</p>
      ))}

      <button onClick={() => setIsOpen(!isOpen)}>
        글쓰기
      </button>

      {isOpen && (
        <ScheduleForm
          dateKey={dateKey}
          schedules={schedules}
          setSchedules={setSchedules}
          close={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ScheduleList;