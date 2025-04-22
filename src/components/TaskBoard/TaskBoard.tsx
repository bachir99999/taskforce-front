import { useEffect, useState } from "react";
import { Task } from "../../types/task";
import TaskCalendar from "../TaskCalendar/TaskCalendar";
import { Button } from "primereact/button";
import CalendarPopup from "../CalendarPopup/CalendarPopup";
import "./TaskBoard.css";
import TaskSidebar from "../TaskSidebar/TaskSidebar";
import { getAllTasks } from "../../lib/api/Task";

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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllTasks()
      .then((data) => setTasks(data.sort((a, b) => a.id - b.id)))
      .catch((error) =>
        console.error("Erreur lors du chargement des tâches :", error)
      )
      .finally(() => setLoading(false));
  }, []);

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

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <div className="taskforce-board">
      <div className="test">
        <TaskSidebar handleFilter={() => {}} />
        <TaskCalendar
          tasks={tasks}
          startDate={startDate}
          handleTaskUpdate={handleTaskUpdate}
        />
      </div>
      <div className="calendar-controls">
        <Button
          icon="pi pi-chevron-left"
          tooltip="Semaine précedente"
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
          tooltip="Semaine suivante"
          onClick={nextWeek}
          className="calendar-controls-buttons"
        />
      </div>
    </div>
  );
}

export default TaskBoard;
