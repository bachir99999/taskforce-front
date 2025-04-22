import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { TaskStatus } from "../../types/task";
import "./DropdownStatus.css";

interface DropdownStatusProps {
  status: TaskStatus;
  handleChange: (status: TaskStatus) => void;
}

const taskStatusOptions = [
  { label: "À faire", value: "TODO", className: "status-todo" },
  { label: "En cours", value: "IN_PROGRESS", className: "status-in-progress" },
  { label: "Terminé", value: "DONE", className: "status-done" },
];

function DropdownStatus({ status, handleChange }: DropdownStatusProps) {
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>(status);

  const selectedOption = taskStatusOptions.find(
    (opt) => opt.value === currentStatus
  );
  const dropdownClass = selectedOption ? selectedOption.className : "";

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const handleStatusChange = (e: { value: TaskStatus }) => {
    setCurrentStatus(e.value);
    handleChange(e.value);
  };

  return (
    <Dropdown
      value={currentStatus}
      onChange={handleStatusChange}
      options={taskStatusOptions}
      optionLabel="label"
      placeholder="Sélectionner un statut"
      className={`dropdown-status ${dropdownClass}`}
      onPointerDown={(e) => e.stopPropagation()}
    />
  );
}

export default DropdownStatus;
