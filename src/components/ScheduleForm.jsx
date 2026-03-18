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
    close();
  };

  return (
    <div className="flex gap-2">
      <input
        className="border p-1 rounded w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addSchedule();
          }
        }}
        placeholder="일정 입력"
      />
      <button
        type="button"
        className="bg-blue-500 text-white px-3 rounded"
        onClick={addSchedule}
      >
        추가
      </button>
    </div>
  );
};

export default ScheduleForm;