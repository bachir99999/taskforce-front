import { useState } from "react";
import { Task } from "../../types/task";
import TaskCalendar from "../TaskCalendar/TaskCalendar";
import { Button } from "primereact/button";
import CalendarPopup from "../CalendarPopup/CalendarPopup";
import "./TaskBoard.css";
import TaskSidebar from "../TaskSidebar/TaskSidebar";

const tasks: Task[] = [
  {
    id: 1,
    title: "Faire le rapport",
    status: "TODO",
    description: "Rapport trimestriel",
    date: new Date("2025-03-31"),
  },
  {
    id: 2,
    title: "Réunion client",
    status: "En cours",
    description: "Discussion projet",
    date: new Date("2025-04-01"),
  },
  {
    id: 3,
    title: "Livrer le produit",
    status: "Terminé",
    description:
      "Livraison finale sdqsd dqsd qsdqsdqsdqsdqs qsdqs dqsdqs dqsd qd qs dqsd qsdqs dqsdqsd qs dqsd ",
    date: new Date("2025-04-04"),
  },
];

const getMonday = (date: Date) => {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Ajuster si dimanche
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  return monday;
};

function TaskBoard() {
  const [startDate, setStartDate] = useState(getMonday(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const prevWeek = () => {
    setStartDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };

  const nextWeek = () => {
    setStartDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  };

  const onDateChange = (value: any) => {
    if (value) {
      setSelectedDate(value);
      setStartDate(getMonday(value));
    }
  };

  return (
    <div className="taskforce-board">
      <div className="test">
        <TaskSidebar handleFilter={() => {}} />
        <TaskCalendar tasks={tasks} startDate={startDate} />
      </div>
      <div className="calendar-controls">
        <Button
          icon="pi pi-chevron-left"
          onClick={prevWeek}
          className="calendar-controls-buttons"
        />
        <CalendarPopup
          date={selectedDate}
          handleChange={onDateChange}
          onlyIcon
        />
        <Button
          icon="pi pi-chevron-right"
          onClick={nextWeek}
          className="calendar-controls-buttons"
        />
      </div>
    </div>
  );
}

export default TaskBoard;
