import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Button } from "primereact/button";
import "./RegisterForm.css";

function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const footer = (
    <div className="register-form-footer">
      <Button
        label="Créer un compte"
        className="register-button p-button-raised p-button-primary"
        // onClick={handleSubmit}
      />
      <div className="register-footer-register">
        <span className="register-footer-text">Déjà un compte ?</span>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            onSwitchToLogin();
          }}
          className="register-footer-link"
        >
          S'identifier
        </a>
      </div>
    </div>
  );

  return (
    <Card title="Inscription" footer={footer} className="register-form-card">
      <div className="register-form-input">
        <div className="input-container">
          <i className="pi pi-user icon" />
          <InputText
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom d'utilisateur"
            required
            invalid={error}
          />
          {error && <small className="error-message">{errorMessage}</small>}
        </div>
      </div>
      <div className="register-form-input">
        <div className="input-container">
          <i className="pi pi-envelope icon" />
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
            invalid={error}
          />
          {error && <small className="error-message">{errorMessage}</small>}
        </div>
      </div>
      <div className="register-form-input">
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
          {error && <small className="error-message">{errorMessage}</small>}
        </div>
      </div>
      <div className="accept-condition-container">
        <div className="accept-condition-icon">
          <label htmlFor="accept-condition" className="checkbox-label">
            <input type="checkbox" id="accept-condition" />
            J'accepte les conditions d'utilisation
          </label>
        </div>
      </div>
    </Card>
  );
}

export default RegisterForm;
