import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <h1>Cosmétiques Beauté</h1>
      </div>

      {/* Bouton pour afficher le menu en petit écran */}
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        Menu
      </button>

      {/* Menu Navigation */}
      <nav className={`navbar-menu ${isOpen ? "nav-open" : ""}`}>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalogue" className={({ isActive }) => (isActive ? "active" : "")}>
              Catalogue
            </NavLink>
          </li>
          <li>
            <NavLink to="/connexion" className={({ isActive }) => (isActive ? "active" : "")}>
              Connexion
            </NavLink>
          </li>
          <li>
            <NavLink to="/inscription" className={({ isActive }) => (isActive ? "active" : "")}>
              Inscription
            </NavLink>
          </li>
          <li>
            <NavLink to="/panier" className={({ isActive }) => (isActive ? "active" : "")}>
              Panier (0)
            </NavLink>
          </li>
          <li>
            <NavLink to="/tableau_de_bord" className={({ isActive }) => (isActive ? "active" : "")}>
              Tableau de bord
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
