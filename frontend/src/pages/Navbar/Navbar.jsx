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
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalogue" className={({ isActive }) => isActive ? "active" : ""}>
              Catalogue
            </NavLink>
          </li>
          <li>
            <NavLink to="/connexion" className={({ isActive }) => isActive ? "active" : ""}>
              Connexion
            </NavLink>
          </li>
          <li>
            <NavLink to="/inscription" className={({ isActive }) => isActive ? "active" : ""}>
              Inscription
            </NavLink>
          </li>
          <li>
            <NavLink to="/panier" className={({ isActive }) => isActive ? "active" : ""}>
              Panier (<span id="cart-count">0</span>)
            </NavLink>
          </li>
          <li>
            <NavLink to="/tableau_de_bord" className={({ isActive }) => isActive ? "active" : ""}>
              Tableau de bord
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
