import { Link } from "react-router-dom";
import { useState } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import "./connexion.css";

const Connexion = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (pwd) => {
    if (pwd.length < 8) {
      return "Le mot de passe doit contenir au moins 8 caractères";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  return (
    <div className="connexion-container">
      <Navbar />
      <div className="connexion-content">
        <div className="image-section">
          <img src="/images/nyah.png" alt="Bienvenue chez Cosmétiques Beauté" />
        </div>

        <div className="form-container">
          <h2>Se connecter</h2>
          <form>
            <input type="email" name="email" placeholder="Email" required />
            
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mot de passe"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <span 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            
            {passwordError && (
              <p className="error-message">{passwordError}</p>
            )}

            <button type="submit">Se connecter</button>
          </form>
          <div className="form-links">
            <p>Pas encore de compte ? <Link to="/Inscription">Créer un compte</Link></p>
            <p>
              <a className="forgot-password-btn" onClick={() => setShowModal(true)}>Mot de passe oublié ?</a>
            </p>
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2025 Cosmétiques Beauté. Tous droits réservés.</p>
      </footer>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <FaTimes className="close-icon" onClick={() => setShowModal(false)} />
            <h2>Réinitialiser le mot de passe</h2>
            <p>Entrez votre email pour recevoir un lien de réinitialisation.</p>
            <input type="email" name="reset-email" placeholder="Votre email" required />
            <button>Envoyer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connexion;
