import { Card } from "primereact/card";
import "./LoginForm.css";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Button } from "primereact/button";
import { loginUser } from "../../lib/api/auth";
import { useAuth } from "../../context/AuthContext";

function LoginForm({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const { login } = useAuth();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setError(false);
    try {
      const res = await loginUser({ name, password });
      login(`${res.type} ${res.token}`);
      window.location.href = "/";
    } catch (err: any) {
      setError(true);
      setErrorMessage(err.message);
    }
  };

  const footer = (
    <div className="login-form-footer">
      <Button
        label="Se connecter"
        className="login-button p-button-raised p-button-primary"
        onClick={handleSubmit}
      />
      <div className="login-footer-register">
        <span className="login-footer-text">Pas encore de compte ?</span>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            onSwitchToRegister();
          }}
          className="login-footer-link"
        >
          S'inscrire
        </a>
      </div>
    </div>
  );

  return (
    <Card title="Connexion" footer={footer} className="login-form-card">
      <div className="login-form-input">
        <div className="input-container">
          <i className="pi pi-user icon" />
          <InputText
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom d'utilisateur"
            required
            invalid={error}
          />
        </div>
      </div>
      <div className="login-form-input">
        <div className="input-container">
          <i className="pi pi-lock icon" />
          <InputText
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            type="password"
            required
            invalid={error}
          />
        </div>
      </div>
      {error && <small className="error-message">{errorMessage}</small>}
      <div className="remember-me-container">
        <div className="remember-me-icon">
          <label htmlFor="remember-me" className="checkbox-label">
            <input
              type="checkbox"
              id="remember-me"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            Se souvenir de moi
          </label>
        </div>

        <a href="#" className="forgot-password-link">
          Mot de passe oublié ?
        </a>
      </div>
    </Card>
  );
}

export default LoginForm;
