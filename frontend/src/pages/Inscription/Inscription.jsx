import Navbar from "../Navbar/Navbar";
import "./Inscription.css";

const Inscription = () => {
  return (
    <div className="inscription-container">
      <Navbar />
      <div className="inscription-content">
        {/* Section gauche avec l'image et le texte superposé */}
        <div className="image-section">
          <img src="/images/bb.jpg" alt="Bienvenue chez Cosmétiques Beauté" />
          <div className="overlay-text">
            <h2>Rejoignez-nous dès aujourd’hui !</h2>
            <p>Créez un compte pour acheter et vendre vos produits de beauté.</p>
          </div>
        </div>

        {/* Section droite avec le formulaire */}
        <div className="form-container">
          <h2>Créer un compte</h2>
          <form>
            <input type="text" name="name" placeholder="Nom" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Mot de passe" required />
            <input type="password" name="confirm-password" placeholder="Confirmer le mot de passe" required />
            <button type="submit">S&apos;inscrire</button>
          </form>
          <div className="form-links">
            <p>
              Vous avez déjà un compte ? <a href="./productDetails">Se connecter</a>
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
