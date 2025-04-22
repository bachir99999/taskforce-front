import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import DropdownStatus from "../DropdownStatus/DropdownStatus";
import { Task } from "../../types/task";
import "./TaskDetailsPopup.css";
import CalendarPopup from "../CalendarPopup/CalendarPopup";

interface TaskDetailsPopupProps {
  task: Task | null;
  visible: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}
function TaskDetailsPopup({
  task,
  visible,
  onClose,
  onSave,
}: TaskDetailsPopupProps) {
  const [editedTask, setEditedTask] = useState<Task>(
    task ?? {
      id: -1,
      name: "",
      status: "TODO",
      description: "",
      dueDate: new Date(),
    }
  );

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  const handleChange = (field: keyof Task, value: any) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <Dialog
      header={task ? "Détails de la tâche" : "Création d'une tache"}
      visible={visible}
      onHide={onClose}
      className="task-dialog"
    >
      <div className="task-dialog-content">
        <div className="task-details">
          <label>Titre :</label>
          <InputText
            value={editedTask.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="task-details-input"
          />

          <label>Description :</label>
          <InputTextarea
            value={editedTask.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="task-details-input"
            rows={3}
          />

          <div className="task-details-label-sd">
            <label>Statut : </label> <label> Date :</label>
          </div>
          <div className="taskpopup-dropdown-container">
            <DropdownStatus
              status={editedTask.status}
              handleChange={(value) => handleChange("status", value)}
            />
            <CalendarPopup
              date={editedTask.dueDate}
              handleChange={(value) => handleChange("dueDate", value)}
              onlyIcon={false}
            />
          </div>

          <div className="task-details-buttons">
            <Button
              label="Annuler"
              icon="pi pi-times"
              className="task-button"
              onClick={onClose}
            />
            <Button
              label="Sauvegarder"
              icon="pi pi-check"
              className="task-button"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default TaskDetailsPopup;
