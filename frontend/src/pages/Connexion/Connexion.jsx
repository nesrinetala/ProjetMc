import { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Importer une icône de fermeture
import Navbar from "../Navbar/Navbar";
import "./connexion.css";

const Connexion = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="inscription-container">
      <Navbar />
      <div className="inscription-content">
        {/* Section gauche avec l'image et le texte superposé */}
        <div className="image-section">
          <img src="/images/cnx.jpg" alt="Bienvenue chez Cosmétiques Beauté" />
          <div className="overlay-text">
            <h2>Connectez-vous pour accéder à votre espace</h2>
            <p>Gérez vos achats et vos ventes facilement.</p>
          </div>
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
            <p>Pas encore de compte ? <a href="./Inscription">Créer un compte</a></p>
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
