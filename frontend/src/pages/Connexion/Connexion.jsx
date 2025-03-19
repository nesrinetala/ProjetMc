import { Link } from "react-router-dom";
import { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Importer une icône de fermeture
import Navbar from "../Navbar/Navbar";
import "./connexion.css";

const Connexion = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="connexion-container">
      <Navbar />
      <div className="connexion-content">
        {/* Section gauche avec l'image et le texte superposé */}
        <div className="image-section">
          <img src="/images/nyah.png" alt="Bienvenue chez Cosmétiques Beauté" />
        </div>

        {/* Section droite avec le formulaire */}
        <div className="form-container">
          <h2>Se connecter</h2>
          <form>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Mot de passe" required />
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

      {/* Fenêtre modale pour le mot de passe oublié */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {/* Bouton de fermeture en haut à droite */}
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
