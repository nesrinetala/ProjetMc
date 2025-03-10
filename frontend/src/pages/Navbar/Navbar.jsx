import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <h1>Cosmétiques Beauté</h1>
      </div>
      <nav>
        <ul className="navbar-menu">
          <li>
            <NavLink to="/" exact activeClassName="active">
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/Catalogue/Catalogue" activeClassName="active">
              Catalogue
            </NavLink>
          </li>
          <li>
            <NavLink to="/Connexion/Connexion" activeClassName="active">
              Connexion
            </NavLink>
          </li>
          <li>
            <NavLink to="/Inscription/Inscription" activeClassName="active">
              Inscription
            </NavLink>
          </li>
          <li>
            <NavLink to="/Panier/Panier" activeClassName="active">
              Panier (<span id="cart-count">0</span>)
            </NavLink>
          </li>
          <li>
            <NavLink to="/TableauDeBord/TableauDeBord" activeClassName="active">
              Tableau de bord
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
