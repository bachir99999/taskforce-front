import TaskColumn from "../TaskColumn/TaskColumn";
import { isSameDay } from "date-fns";
import { Task } from "../../types/task";
import "./TaskCalendar.css";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";

interface TaskCalendarProps {
  tasks: Task[];
  startDate: Date;
}

const getWeekDays = (startDate: Date) => {
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    return new Date(day.getFullYear(), day.getMonth(), day.getDate());
  });
};

function TaskCalendar({ tasks, startDate }: TaskCalendarProps) {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const weekDays = getWeekDays(startDate);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = Number(active.id);
    const newDate = new Date(String(over.id));

    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, date: newDate } : task
      )
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="taskforce-calendar">
        {weekDays.map((day) => {
          const tasksForDay = taskList.filter((task) =>
            isSameDay(task.date, day)
          );
          return (
            <div className="taskcolumn-calendar" key={day.toDateString()}>
              <TaskColumn day={day} tasks={tasksForDay} />
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}

export default TaskCalendar;
