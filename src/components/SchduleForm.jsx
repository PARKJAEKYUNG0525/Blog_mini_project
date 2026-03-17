import { useState } from 'react';

const ScheduleForm = ({ dateKey, schedules, setSchedules, close }) => {

  const [text, setText] = useState('');

  const addSchedule = () => {
    if (!text.trim()) return;

    const newItem = {
      id: Date.now(),
      text
    };

    setSchedules({
      ...schedules,
      [dateKey]: [...(schedules[dateKey] || []), newItem]
    });

    setText('');
    close(); // 입력창 닫기
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="일정 입력"
      />
      <button type='submit' onClick={addSchedule}>[추가]</button>
    </div>
  );
};

export default ScheduleForm;