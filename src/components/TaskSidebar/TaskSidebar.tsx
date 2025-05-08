import { Button } from "primereact/button";
import { Task, TaskStatus } from "../../types/task";
import "./TaskSidebar.css";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";

import { MultiSelect } from "primereact/multiselect";
import TaskDetailsPopup from "../TaskDetailsPopup/TaskDetailsPopup";
import { createTask } from "../../lib/api/Task";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

interface TaskSidebarProps {
  handleFilter: (status: TaskStatus) => void;
  handleCreateTask: (newTask: Task) => void;
}

const taskStatusOptions = [
  { label: "À faire", value: "TODO" },
  { label: "En cours", value: "IN_PROGRESS" },
  { label: "Terminé", value: "DONE" },
];

function TaskSidebar({ handleFilter, handleCreateTask }: TaskSidebarProps) {
  const { user } = useAuth();
  const [visible, setVisible] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>();

  const onCreate = async (newTask: Omit<Task, "id">) => {
    try {
      if (user) {
        handleCreateTask(await createTask(newTask, user.id));
      } else {
        console.error("User is not authenticated.");
      }
      setShowPopup(false);
      toast.success("Création de tache réussi !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Erreur lors de la création de la tâche :", error);
    }
  };

  return (
    <>
      <div className="taskforce-sidebar">
        <Sidebar
          className="taskforce-sidebar-component"
          visible={visible}
          onHide={() => setVisible(false)}
          showCloseIcon={false}
        >
          <div className="taskforce-sidebar-header">
            Taskforce{" "}
            <Button
              className="neon-btn"
              icon="pi pi-angle-double-left"
              onClick={() => setVisible(false)}
            />
          </div>
          <div className="taskforce-sidebar-multiselect-container">
            Filtre sur les status
            <MultiSelect
              className="taskforce-sidebar-multiselect"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.value)}
              options={taskStatusOptions}
              optionLabel="label"
              optionValue="value"
              placeholder="Status selectionné(s)"
            />
          </div>
        </Sidebar>
        <div className="taskforce-sidebar-containers-buttons">
          <Button
            className="neon-btn"
            icon="pi pi-angle-double-right"
            onClick={() => setVisible(true)}
          />
          <Button
            className="neon-btn"
            icon="pi pi-plus"
            onClick={() => setShowPopup(true)}
            tooltip="Ajouter une tache"
          />
        </div>
      </div>
      <TaskDetailsPopup
        task={null}
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        onSave={(newTask) => onCreate(newTask)}
        onDelete={() => {}}
      />
    </>
  );
}

export default TaskSidebar;
