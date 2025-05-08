import { JSX, useEffect, useState } from "react";
import { v4 } from "uuid";
import {
  addMonths,
  endOfWeek,
  startOfWeek,
  subMonths,
  getDaysInMonth,
} from "date-fns";
import "./WeekPicker.css";

interface Week {
  firstDay: Date;
  lastDay: Date;
}

interface WeekPickerProps {
  handleChange: (value: any) => void;
  dueDate: Date;
}

const WeekPicker: React.FC<WeekPickerProps> = ({ handleChange, dueDate }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(dueDate);
  const [week, setWeek] = useState<Week>({
    firstDay: startOfWeek(dueDate, { weekStartsOn: 1 }),
    lastDay: endOfWeek(dueDate, { weekStartsOn: 1 }),
  });

  useEffect(() => {
    const firstDay = startOfWeek(dueDate, { weekStartsOn: 1 });
    const lastDay = endOfWeek(dueDate, { weekStartsOn: 1 });
    setWeek({ firstDay, lastDay });
  }, [dueDate]);

  const isLeapYear = (): boolean => {
    const year = dueDate.getFullYear();
    return new Date(year, 1, 29).getDate() === 29;
  };

  const convertDate = (date: Date): string => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLDivElement;
    let localDate: Date;

    if (target.id.includes("prev")) {
      localDate = new Date(date.setDate(1));
      setDate(new Date(date.setDate(1)));
    } else if (target.id.includes("next")) {
      localDate = new Date(date.setDate(getDaysInMonth(date)));
      setDate(new Date(date.setDate(getDaysInMonth(date))));
    } else {
      localDate = new Date(date.setDate(parseInt(target.id)));
      setDate(new Date(date.setDate(parseInt(target.id))));
    }

    const firstDay = startOfWeek(localDate, { weekStartsOn: 1 });
    const lastDay = endOfWeek(localDate, { weekStartsOn: 1 });
    setWeek({ firstDay, lastDay });
    console.log("firstDay", firstDay);

    handleChange(firstDay);
  };

  const months: string[] = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun",
    "July",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  const days: Record<string, number> = {
    "1": 31,
    "2": isLeapYear() ? 29 : 28,
    "3": 31,
    "4": 30,
    "5": 31,
    "6": 30,
    "7": 31,
    "8": 31,
    "9": 30,
    "10": 31,
    "11": 30,
    "12": 31,
  };

  const renderDays = (): JSX.Element[] => {
    const month = date.getMonth() + 1;
    const ar: JSX.Element[] = [];

    for (let i = 1; i <= days[month]; i++) {
      const currentDate = new Date(date).setDate(i);

      let cName = "single-number ";
      if (
        new Date(week.firstDay).getTime() <= currentDate &&
        currentDate <= new Date(week.lastDay).getTime()
      ) {
        cName += "selected-week";
      }

      ar.push(
        <div
          key={v4()}
          id={i.toString()}
          className={cName}
          onClick={handleClick}
        >
          {i}
        </div>
      );
    }

    const displayDate = new Date(date).setDate(1);
    let dayInTheWeek = new Date(displayDate).getDay();
    if (dayInTheWeek < 1) {
      dayInTheWeek = 7;
    }

    const prevMonth: JSX.Element[] = [];
    const prevMonthDays = date.getMonth() === 0 ? 12 : date.getMonth();

    for (let i = dayInTheWeek; i > 1; i--) {
      const previousMonth = new Date(date).setMonth(date.getMonth() - 1);
      const currentDate = new Date(previousMonth).setDate(
        days[prevMonthDays] - i + 2
      );

      let cName = "single-number other-month";
      if (
        currentDate >= week.firstDay.getTime() &&
        currentDate <= week.lastDay.getTime()
      ) {
        cName = "single-number selected-week";
      }

      prevMonth.push(
        <div
          key={v4()}
          onClick={handleClick}
          id={`prev-${i}`}
          className={cName}
        >
          {days[prevMonthDays] - i + 2}
        </div>
      );
    }

    const nextMonth: JSX.Element[] = [];
    let fullDays = 35;
    if ([...prevMonth, ...ar].length > 35) {
      fullDays = 42;
    }

    for (let i = 1; i <= fullDays - [...prevMonth, ...ar].length; i++) {
      let cName = "single-number other-month";
      const lastDay = week.lastDay.getTime();
      const lastDayOfMonth = new Date(date).setDate(getDaysInMonth(date));

      if (
        lastDayOfMonth <= lastDay &&
        week.firstDay.getMonth() === new Date(lastDayOfMonth).getMonth()
      ) {
        cName = "single-number selected-week";
      }

      nextMonth.push(
        <div
          key={v4()}
          onClick={handleClick}
          id={`next-${i}`}
          className={cName}
        >
          {i}
        </div>
      );
    }

    return [...prevMonth, ...ar, ...nextMonth];
  };

  const handleDate = (next: boolean): void => {
    const localDate = next ? addMonths(date, 1) : subMonths(date, 1);
    setDate(localDate);
  };

  return (
    <div
      className="week-picker-display"
      onBlur={() => setOpen(false)}
      onClick={() => setOpen(true)}
      tabIndex={0}
    >
      <i className="pi pi-calendar" />
      {open && (
        <div className="week-picker-options">
          <div className="title-week">
            <div onClick={() => handleDate(false)} className="arrow-container">
              {"<"}
            </div>
            {`${months[date.getMonth()]} ${date.getFullYear()}`}
            <div onClick={() => handleDate(true)} className="arrow-container">
              {">"}
            </div>
          </div>
          <div className="numbers-container">
            <div className="single-number day">Mon</div>
            <div className="single-number day">Tue</div>
            <div className="single-number day">Wed</div>
            <div className="single-number day">Thu</div>
            <div className="single-number day">Fri</div>
            <div className="single-number day">Sat</div>
            <div className="single-number day">Sun</div>
          </div>
          <div className="numbers-container">{renderDays()}</div>
        </div>
      )}
    </div>
  );
};

export default WeekPicker;
