import "./Connexion.css";
import Navbar from "../Navbar/Navbar";

const Connexion = () => {
  return (
    <div>
      <Navbar/>
      {/* Formulaire de connexion */}
      <div className="form-container">
        <h2>Se connecter</h2>
        <form action="connexion-process.php" method="POST" className="connexion-form">
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Mot de passe" required />
          <button type="submit">Se connecter</button>
        </form>

        {/* Liens supplémentaires */}
        <div className="form-links">
          <p>Pas encore de compte ? <a href="../../inscription/inscription.html">Créer un compte</a></p>
          <p><a href="../mot-de-passe-oublie/mot-de-passe-oublie.html">Mot de passe oublié ?</a></p>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Cosmétiques Beauté. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Connexion;
