import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Inscription.css";

const Inscription = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);

  const validatePassword = (pwd) => {
    const errors = [];
    if (pwd.length < 8) errors.push("Minimum 8 caractères");
    if (!pwd.match(/[A-Z]/)) errors.push("Au moins une majuscule");
    if (!pwd.match(/[0-9]/)) errors.push("Au moins un chiffre");
    if (!pwd.match(/[^A-Za-z0-9]/)) errors.push("Au moins un caractère spécial");
    return errors;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordErrors(validatePassword(newPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="inscription-container">
      <Navbar />
      <div className="inscription-content">
        <div className="image-section">
          <img src="/images/cnxhht.png" alt="Bienvenue chez Cosmétiques Beauté" />
        </div>

        <div className="form-container">
          <h2>Créer un compte</h2>
          <form>
            <input type="text" name="name" placeholder="Nom" required />
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
            
            {passwordErrors.length > 0 && (
              <div className="password-requirements">
                <p>Le mot de passe doit contenir :</p>
                <ul>
                  {passwordErrors.map((error, index) => (
                    <li key={index} className="requirement-item">{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm-password"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <span 
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {confirmPassword && password !== confirmPassword && (
              <p className="error-message">Les mots de passe ne correspondent pas</p>
            )}

            <button 
              type="submit" 
              disabled={passwordErrors.length > 0 || password !== confirmPassword}
            >
              S'inscrire
            </button>
          </form>
          <div className="form-links">
            <p>
              Vous avez déjà un compte ? <Link to="/connexion">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2025 Cosmétiques Beauté. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Inscription;
