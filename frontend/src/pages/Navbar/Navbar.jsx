import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaSignOutAlt, FaKey, FaTrash, FaUser, FaSearch, FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Temporairement true pour tester le profil
  const profileMenuRef = useRef(null);

  // Données utilisateur simulées
  const [user, setUser] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "Membre"
  });

  useEffect(() => {
    // Simulation de vérification d'authentification
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    
    // Charger les données utilisateur simulées
    if (isAuthenticated) {
      setUser({
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        photo: "https://randomuser.me/api/portraits/men/1.jpg",
        role: "Membre"
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Fermer le menu profil quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Simulation de déconnexion
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-50 py-4 px-4 md:px-14 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Logo et liens de navigation */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <span className="logo-glow text-2xl font-serif text-amber-600 dark:text-amber-400">Lana Glow</span>
        </Link>

        {/* Liens de navigation (version desktop) */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 px-3 py-2 transition-colors duration-200"
          >
            Accueil
          </Link>
          <Link
            to="/catalogue"
            className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 px-3 py-2 transition-colors duration-200"
          >
            Catalogue
          </Link>
          {!isAuthenticated && (
            <>
              <Link
                to="/connexion"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 px-3 py-2 transition-colors duration-200"
              >
                Se connecter
              </Link>
              <Link
                to="/inscription"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 px-3 py-2 transition-colors duration-200"
              >
                Inscription
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link
                to="/tableau_de_bord"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 px-3 py-2 transition-colors duration-200"
              >
                Tableau de bord
              </Link>
              <Link
                to="/profil"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 px-3 py-2 transition-colors duration-200"
              >
                Profil
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="hidden md:block relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher..."
          className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      </div>

      {/* Boutons droite */}
      <div className="flex items-center space-x-4">
        {/* Bouton dark/light mode */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-800 dark:text-white"
        >
          {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </button>

        {/* Bouton Panier */}
        <button
          onClick={() => navigate("/panier")}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
        >
          <FaShoppingCart className="w-5 h-5" />
        </button>

        {/* Menu hamburger (mobile) */}
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <FaBars className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>

        {/* Photo de profil avec menu */}
        <div className="relative hidden md:block" ref={profileMenuRef}>
          <div 
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-200 cursor-pointer flex items-center justify-center bg-gray-100 dark:bg-gray-700"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            {isAuthenticated && user.photo ? (
              <img
                className="w-full h-full object-cover"
                src={user.photo}
                alt="Photo de profil"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='40' r='20' fill='%23ddd'/%3E%3Ccircle cx='50' cy='100' r='30' fill='%23ddd'/%3E%3C/svg%3E";
                }}
              />
            ) : (
              <FaUser className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            )}
          </div>
          {isAuthenticated && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
          )}

          {/* Menu profil */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
              {/* En-tête du menu */}
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {isAuthenticated ? user.name : "Invité"}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {isAuthenticated ? user.email : "Non connecté"}
                </p>
                {isAuthenticated && (
                  <span className="inline-block mt-1 text-xs bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full">
                    {user.role}
                  </span>
                )}
              </div>

              {/* Options du menu */}
              <ul className="py-1">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        to="/profil"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <FaUser className="mr-3" />
                        Mon Profil
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tableau_de_bord"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Tableau de bord
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/panier"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <FaShoppingCart className="mr-3" />
                        Mon panier
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/ChangePasswordPage"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <FaKey className="mr-3" />
                        Changer mot de passe
                      </Link>
                    </li>
                    <li className="border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          handleLogout();
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-400"
                      >
                        <FaSignOutAlt className="mr-3" />
                        Déconnexion
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/connexion"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <FaUser className="mr-3" />
                        Se connecter
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/inscription"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <FaKey className="mr-3" />
                        S'inscrire
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Dropdown menu (mobile) */}
      {isDropdownOpen && (
        <div className="md:hidden absolute top-16 right-4 z-50 w-56 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3">
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              {isAuthenticated ? user.name : "Invité"}
            </span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
              {isAuthenticated ? user.email : "Non connecté"}
            </span>
          </div>
          <ul className="py-2">
            <li>
              <Link
                to="/"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/catalogue"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Catalogue
              </Link>
            </li>
            {!isAuthenticated && (
              <>
                <li>
                  <Link
                    to="/connexion"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Se connecter
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inscription"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Inscription
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <>
                <li>
                  <Link
                    to="/tableau_de_bord"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Tableau de bord
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profil"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Profil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/panier"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Panier
                  </Link>
                </li>
                <li className="border-t border-gray-200 dark:border-gray-600">
                  <Link
                    to="/profil"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                  >
                    <FaUser className="mr-2" />
                    Mon Profil
                  </Link>
                </li>
                <li>
                  <Link
                    to="ChangePasswordPage"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                  >
                    <FaKey className="mr-2" />
                    Changer mot de passe
                  </Link>
                </li>
                <li className="border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Déconnexion
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}