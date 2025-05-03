import { useState } from "react";
import TaskForce from "../../assets/TaskForce1.png";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./Identification.css";

function Identification() {
  const [action, setAction] = useState<string>("login");

  return (
    <div className="identification-container">
      <div className="identification-header">
        <img src={TaskForce} alt="Logo" className="app-logo" />
      </div>
      <div className={`identification-content ${action}`}>
        <LoginForm onSwitchToRegister={() => setAction("register")} />
        <RegisterForm onSwitchToLogin={() => setAction("login")} />
      </div>
    </div>
  );
}

export default Identification;
