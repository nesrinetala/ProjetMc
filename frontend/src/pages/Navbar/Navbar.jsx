import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaSignOutAlt, FaKey, FaUser, FaSearch, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isLoading: authLoading } = useAuth();

  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [searchQuery, setSearchQuery] = useState("");
  const profileMenuRef = useRef(null);

  // Gestion du thème sombre
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Ferme le menu quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setProfileMenuOpen(false);
      setIsDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      setProfileMenuOpen(false);
      setIsDropdownOpen(false);
    }
  }, [isAuthenticated, authLoading]);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 py-4 px-4 md:px-14 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Logo et liens de navigation */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex items-center space-x-3">
          <span className="text-2xl font-serif text-amber-600 dark:text-amber-400">Lana Glow</span>
        </Link>

        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 px-3 py-2 transition-colors duration-200">
            Accueil
          </Link>
          <Link to="/catalogue" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 px-3 py-2 transition-colors duration-200">
            Catalogue
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/tableau-de-bord" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 px-3 py-2 transition-colors duration-200">
                Tableau de bord
              </Link>
              <Link to="/profil" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 px-3 py-2 transition-colors duration-200">
                Profil
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="hidden md:block relative mx-4 flex-1 max-w-md">
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      </div>

      {/* Boutons droite */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {darkMode ? (
            <FaSun className="w-5 h-5 text-amber-500" />
          ) : (
            <FaMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>

        <button
          onClick={() => navigate("/panier")}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200"
        >
          <FaShoppingCart className="w-5 h-5" />
        </button>

        {/* Menu mobile */}
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <FaBars className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>

        {/* Profil (version desktop) */}
        <div className="relative hidden md:block" ref={profileMenuRef}>
          <div 
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-200 cursor-pointer flex items-center justify-center bg-gray-100 dark:bg-gray-700"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            {isAuthenticated && user?.photo ? (
              <img
                src={user.photo}
                alt="Photo de profil"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;base64,...";
                }}
              />
            ) : (
              <FaUser className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            )}
          </div>
          
          {isAuthenticated && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
          )}

          {/* Menu déroulant profil */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {isAuthenticated ? user?.username : "Invité"}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {isAuthenticated ? user?.email : "Non connecté"}
                </p>
                {isAuthenticated && (
                  <span className="inline-block mt-1 text-xs bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full">
                    {user?.role}
                  </span>
                )}
              </div>

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
                        to="/tableau-de-bord"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        onClick={() => setProfileMenuOpen(false)}
                      >
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
                        to="/changepasswordpage"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <FaKey className="mr-3" />
                        Modifier le mot de passe
                      </Link>
                    </li>
                    <li className="border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={handleLogout}
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

      {/* Menu mobile dropdown */}
      {isDropdownOpen && (
        <div className="md:hidden absolute top-16 right-4 z-50 w-56 bg-white rounded-lg shadow-lg dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-600">
          <div className="px-4 py-3">
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              {isAuthenticated ? user?.username : "Invité"}
            </span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
              {isAuthenticated ? user?.email : "Non connecté"}
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
            
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/tableau-de-bord"
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
                <li>
                  <Link
                    to="/changepasswordpage"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                  >
                    <FaKey className="mr-2" />
                    Modifier le mot de passe
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
            ) : (
              <>
                <li>
                  <Link
                    to="/connexion"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Connexion
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
          </ul>
        </div>
      )}
    </nav>
  );
}