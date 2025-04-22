import { Task } from "../../types/task";
import "./TaskCard.css";
import DropdownStatus from "../DropdownStatus/DropdownStatus";
import { useDraggable } from "@dnd-kit/core";
import PopupButton from "../PopupButton/PopupButton";
import TaskDetailsPopup from "../TaskDetailsPopup/TaskDetailsPopup";
import { useState } from "react";
import { updateTask } from "../../lib/api/Task";

interface TaskCardProps {
  task: Task;
  handleTaskUpdate: (updatedTask: Task) => void;
}

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

function TaskCard({ task, handleTaskUpdate }: TaskCardProps) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [curTask, setCurTask] = useState<Task>(task);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: curTask.id.toString(),
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const handleSaveTask = async (updatedTask: Task) => {
    if (JSON.stringify(curTask) !== JSON.stringify(updatedTask)) {
      try {
        setCurTask(updatedTask);
        await updateTask(updatedTask.id, {
          name: updatedTask.name,
          description: updatedTask.description,
          status: updatedTask.status,
          dueDate: updatedTask.dueDate,
        });
        handleTaskUpdate(updatedTask);
      } catch (err) {
        console.error("Erreur update :", err);
      }
    }
  };

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
          {curTask.name}
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
          <DropdownStatus
            status={curTask.status}
            handleChange={(newStatus) => {
              handleSaveTask({ ...curTask, status: newStatus });
            }}
          />
        </div>
      </div>
      <TaskDetailsPopup
        task={curTask}
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        onSave={handleSaveTask}
      />
    </>
  );
}

export default TaskCard;
