import { Task } from "../../types/task";
import "./TaskCard.css";
import DropdownStatus from "../DropdownStatus/DropdownStatus";
import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="taskforce-card"
      style={style}
    >
      <div className="taskforce-card-title">{task.title}</div>
      {task.description && (
        <div className="taskforce-card-desc">
          {truncateText(task.description, 35)}
        </div>
      )}
      <DropdownStatus status={task.status} />
    </div>
  );
}

export default TaskCard;
