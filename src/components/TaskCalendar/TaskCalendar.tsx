import TaskColumn from "../TaskColumn/TaskColumn";
import { isSameDay } from "date-fns";
import { Task } from "../../types/task";
import "./TaskCalendar.css";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { updateTask } from "../../lib/api/taskAPI";
import { useAuth } from "../../context/AuthContext";

interface TaskCalendarProps {
  tasks: Task[];
  startDate: Date;
  handleTaskUpdate: (updatedTask: Task) => void;
  handleTaskDelete: (taskId: number) => void;
}

const getWeekDays = (startDate: Date) => {
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    return new Date(day.getFullYear(), day.getMonth(), day.getDate());
  });
};

function TaskCalendar({
  tasks,
  startDate,
  handleTaskUpdate,
  handleTaskDelete,
}: TaskCalendarProps) {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const { user } = useAuth();

  const weekDays = getWeekDays(startDate);

  const handleSaveTask = async (updatedTask: Task) => {
    try {
      if (!user) {
        console.error("User is not authenticated.");
        return;
      }
      await updateTask(
        updatedTask.id,
        {
          name: updatedTask.name,
          description: updatedTask.description,
          status: updatedTask.status,
          dueDate: updatedTask.dueDate,
        },
        user.id
      );
      handleTaskUpdate(updatedTask);
    } catch (err) {
      console.error("Erreur update :", err);
    }
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = Number(active.id);
    const newDate = new Date(String(over.id));

    setTaskList((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, dueDate: newDate };
          handleSaveTask(updatedTask);
          return updatedTask;
        }
        return task;
      })
    );
  }

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="taskforce-calendar">
        {weekDays.map((day) => {
          const tasksForDay = taskList.filter((task) =>
            isSameDay(task.dueDate, day)
          );
          return (
            <div className="taskcolumn-calendar" key={day.toDateString()}>
              <TaskColumn
                day={day}
                tasks={tasksForDay}
                handleTaskUpdate={handleTaskUpdate}
                handleTaskDelete={handleTaskDelete}
              />
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}

export default TaskCalendar;
