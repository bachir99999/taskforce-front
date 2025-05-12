import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../lib/api/userAPI";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = () => {
    // Logique pour sauvegarder les modifications
    if (!handleSumbit() && user) {
      updateUser(user.id, { name, email, password });
    }
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleLogout = async () => {
    await navigate("/login");
    logout();
  };

  const handleSumbit = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError(true);
      setErrorMessage("Tous les champs sont obligatoires");
      return false;
    }
    if (name.length > 25) {
      setError(true);
      setErrorMessage("Le nom ne doit pas dépasser 25 caractères");
      return false;
    }
    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("Les mots de passe ne correspondent pas");
      return false;
    }
    if (password.length < 6 || password.length > 25) {
      setError(true);
      setErrorMessage(
        "Le mot de passe doit contenir au moins 6 caractères et au plus 25 caractères"
      );
      return false;
    }
    if (!/\d/.test(password)) {
      setError(true);
      setErrorMessage("Le mot de passe doit contenir au moins un chiffre");
      return false;
    }
    if (!/[a-zA-Z]/.test(password)) {
      setError(true);
      setErrorMessage("Le mot de passe doit contenir au moins une lettre");
      return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setError(true);
      setErrorMessage(
        "Le mot de passe doit contenir au moins un caractère spécial"
      );
      return false;
    }
    return true;
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="neon-text">Bienvenu, {name}</h1>
      </div>
      <div className="profile-content">
        <div className="profile-card">
          <h2 className="neon-text">Edit Profile</h2>
          <div className="profile-input-group">
            <label htmlFor="name" className="profile-label">
              Name
            </label>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="profile-input"
            />
          </div>
          <div className="profile-input-group">
            <label htmlFor="email" className="profile-label">
              Email
            </label>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="profile-input"
            />
          </div>
          <div className="profile-input-group">
            <label htmlFor="password" className="profile-label">
              Password
            </label>
            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="profile-input"
            />
          </div>
          <div className="profile-input-group">
            <label htmlFor="confirmPassword" className="profile-label">
              Confirm Password
            </label>
            <InputText
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="profile-input"
            />
          </div>
          {error && <small className="error-message">{errorMessage}</small>}
          <Button
            label="Save Changes"
            icon="pi pi-save"
            className="profile-save-btn"
            onClick={handleSave}
          />
        </div>
      </div>
      <Button
        label="Logout"
        icon="pi pi-sign-out"
        className="profile-logout-btn"
        onClick={handleLogout}
      />
    </div>
  );
}

export default Profile;
