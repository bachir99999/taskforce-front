import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { TaskStatus } from "../../types/task";
import "./DropdownStatus.css";

interface DropdownStatusProps {
  status: TaskStatus;
}

const taskStatusOptions = [
  { label: "À faire", value: "TODO", className: "status-todo" },
  { label: "En cours", value: "En cours", className: "status-in-progress" },
  { label: "Terminé", value: "Terminé", className: "status-done" },
];

function DropdownStatus({ status }: DropdownStatusProps) {
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>(status);

  const selectedOption = taskStatusOptions.find(
    (opt) => opt.value === currentStatus
  );
  const dropdownClass = selectedOption ? selectedOption.className : "";

  return (
    <Dropdown
      value={currentStatus}
      onChange={(e) => setCurrentStatus(e.value)}
      options={taskStatusOptions}
      optionLabel="label"
      placeholder="Sélectionner un statut"
      className={`dropdown-status ${dropdownClass}`}
      onPointerDown={(e) => e.stopPropagation()}
    />
  );
}

export default DropdownStatus;
