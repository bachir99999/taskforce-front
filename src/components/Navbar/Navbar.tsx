import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { label: "Taskforce", icon: "pi pi-home", command: () => navigate("/") },
    {
      label: "Statistiques",
      icon: "pi pi-chart-bar",
      command: () => navigate("/stats"),
    },
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => navigate("/user"),
    },
  ];

  return (
    <div className="taskforce-navbar">
      <div className="taskforce-navbar-title">TASKFORCE</div>
      <div className="taskforce-navbar-menu">
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        />
      </div>
    </div>
  );
}

export default Navbar;
