import { Task } from "../../types/task";
import TaskCard from "../TaskCard/TaskCard";
import { Panel } from "primereact/panel";
import "./TaskColumn.css";
import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";

interface TaskColumnProps {
  day: Date;
  tasks: Task[];
}

function TaskColumn({ day, tasks }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: day.toDateString(),
  });

  const formattedDate = day.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <Panel
      headerTemplate={() => (
        <div className="taskcolumn-header">{formattedDate.toUpperCase()}</div>
      )}
      toggleable
      collapsed={false}
      style={{ flex: 1, height: "100%" }}
    >
      <div
        ref={setNodeRef}
        className={clsx("taskforce-column", { "is-over": isOver })}
        data-day={day.toDateString()}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="empty-tasks">Aucune tâche</div>
        )}
      </div>
    </Panel>
  );
}

export default TaskColumn;
