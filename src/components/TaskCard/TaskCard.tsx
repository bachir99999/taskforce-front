import { Task } from "../../types/task";
import "./TaskCard.css";
import DropdownStatus from "../DropdownStatus/DropdownStatus";
import { useDraggable } from "@dnd-kit/core";
import PopupButton from "../PopupButton/PopupButton";
import TaskDetailsPopup from "../TaskDetailsPopup/TaskDetailsPopup";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const [showPopup, setShowPopup] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="taskforce-card"
        style={style}
      >
        <div className="taskforce-card-title">
          {task.title}
          <div className="taskcard-popup-button">
            <PopupButton onClick={() => setShowPopup(true)} />
          </div>
        </div>

        {task.description && (
          <div className="taskforce-card-desc">
            {truncateText(task.description, 35)}
          </div>
        )}
        <DropdownStatus status={task.status} />
      </div>
      <TaskDetailsPopup
        task={task}
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        onSave={(updatedTask) =>
          console.log("Tâche mise à jour :", updatedTask)
        }
      />
    </>
  );
}

export default TaskCard;
