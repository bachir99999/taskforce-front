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
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [curTask, setCurTask] = useState<Task>(task);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: curTask.id.toString(),
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
          {curTask.title}
          <div className="taskcard-popup-button">
            <PopupButton onClick={() => setShowPopup(true)} />
          </div>
        </div>

        {curTask.description && (
          <div className="taskforce-card-desc">
            {truncateText(curTask.description, 35)}
          </div>
        )}
        <div className="taskforce-card-dropdownstatus">
          <DropdownStatus status={curTask.status} />
        </div>
      </div>
      <TaskDetailsPopup
        task={curTask}
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        onSave={(updatedTask) => {
          console.log("Tâche mise à jour :", updatedTask);
          setCurTask(updatedTask);
        }}
      />
    </>
  );
}

export default TaskCard;
