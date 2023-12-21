import React from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function getNextDays(n: number) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  return days;
}

interface DateRadioInputProps {
  onComplete?: (value: string) => void;
}
const DateRadioInput: React.FC<DateRadioInputProps> = ({ onComplete }) => {
  const items = getNextDays(4);
  return (
    <div className="grid grid-cols-4 gap-2 ml-11 max-w-md">
      {items.map((date) => {
        const id = date.toISOString().split("T")[0];
        return (
          <button
            key={id}
            onClick={() => onComplete?.(id)}
            className="font-bold flex flex-col px-3 py-2 border justify-between items-center border-accent-foreground text-accent-foreground hover:border-brand hover:text-brand rounded-xl"
          >
            <span className="uppercase text-xs">{DAYS[date.getDay()]}</span>
            <span>{date.getDate()}</span>
            <span className="uppercase text-xs">{MONTHS[date.getMonth()]}</span>
          </button>
        );
      })}
    </div>
  );
};

export default DateRadioInput;
