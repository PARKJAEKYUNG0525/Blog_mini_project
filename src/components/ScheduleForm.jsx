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
    if (typeof close === 'function') {
    close();
  }
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
        placeholder="Enter Schedule"
      />
      <button
        type="button"
        className="bg-gray-900 text-white text-[13px] px-2.5 py-1.5 rounded-lg shadow-sm hover:bg-gray-800 transition-all active:scale-95 font-medium inline-block"
        onClick={addSchedule}
      >
        ADD
      </button>
    </div>
  );
};

export default ScheduleForm;