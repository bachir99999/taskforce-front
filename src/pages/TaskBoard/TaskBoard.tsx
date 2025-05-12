import { useEffect, useState } from "react";
import { Task, TaskStatus } from "../../types/task";
import TaskSidebar from "../../components/TaskSidebar/TaskSidebar";
import TaskCalendar from "../../components/TaskCalendar/TaskCalendar";
import { Button } from "primereact/button";
import "./TaskBoard.css";
import WeekPicker from "../../components/WeekPicker/WeekPicker";
import { useAuth } from "../../context/AuthContext";
import { getAllTasksOfUser } from "../../lib/api/userAPI";
import Loading from "../../components/Loading/Loading";

const getMonday = (date: Date) => {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Ajuster si dimanche
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  return monday;
};

function TaskBoard() {
  const [startDate, setStartDate] = useState(getMonday(new Date()));
  const [tasks, setTasks] = useState<Task[]>([]);
  const [curFilters, setCurFilters] = useState<TaskStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getAllTasksOfUser(user.id)
        .then((data) => setTasks(data.sort((a, b) => a.id - b.id)))
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
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
      setStartDate(getMonday(value));
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDelete = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleCreateTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleFilter = (status: TaskStatus[]) => {
    setCurFilters(status);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="taskforce-board">
      <div className="test">
        <TaskSidebar
          handleFilter={handleFilter}
          handleCreateTask={handleCreateTask}
        />
        <TaskCalendar
          tasks={tasks.filter(
            (task) => curFilters.length == 0 || curFilters.includes(task.status)
          )}
          startDate={startDate}
          handleTaskUpdate={handleTaskUpdate}
          handleTaskDelete={handleTaskDelete}
        />
      </div>
      <div className="calendar-controls">
        <Button
          icon="pi pi-chevron-left"
          tooltip="Semaine précedente"
          onClick={prevWeek}
          className="neon-btn"
        />
        <WeekPicker dueDate={startDate} handleChange={onDateChange} />
        <Button
          icon="pi pi-chevron-right"
          tooltip="Semaine suivante"
          onClick={nextWeek}
          className="neon-btn"
        />
      </div>
    </div>
  );
}

export default TaskBoard;
