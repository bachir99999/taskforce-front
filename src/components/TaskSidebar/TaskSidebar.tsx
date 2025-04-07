import { Button } from "primereact/button";
import { TaskStatus } from "../../types/task";
import "./TaskSidebar.css";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";

import { MultiSelect } from "primereact/multiselect";
import TaskDetailsPopup from "../TaskDetailsPopup/TaskDetailsPopup";

interface TaskSidebarProps {
  handleFilter: (status: TaskStatus) => void;
}

const taskStatusOptions = [
  { label: "À faire", value: "TODO" },
  { label: "En cours", value: "En cours" },
  { label: "Terminé", value: "Terminé" },
];

function TaskSidebar({ handleFilter }: TaskSidebarProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>();

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
              className="taskforce-sidebar-buttons"
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
            className="taskforce-sidebar-buttons"
            icon="pi pi-angle-double-right"
            onClick={() => setVisible(true)}
          />
          <Button
            className="taskforce-sidebar-buttons"
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
        onSave={(updatedTask) => {
          console.log("Tâche créé:", updatedTask);
        }}
      />
    </>
  );
}

export default TaskSidebar;
