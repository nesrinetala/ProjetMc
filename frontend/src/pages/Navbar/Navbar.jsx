import { useState, useEffect } from "react";
import { Sun, Moon, Menu, ShoppingCart, Heart } from "lucide-react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 py-4 px-4 md:px-14 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Logo */}
      <a href="#" className="flex items-center space-x-3" data-aos="fade-right">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8"
          alt="Flowbite Logo"
        />
        <span className="text-2xl font-semibold dark:text-white">Flowbite</span>
      </a>

      {/* Boutons droite */}
      <div className="flex items-center space-x-4">
        {/* Bouton favori (nouveau) */}
        <button 
          onClick={() => setFavorite(!favorite)}
          className={`p-2 ${favorite ? 'text-amber-500' : 'text-gray-400'} hover:text-amber-500 transition`}
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <Heart fill={favorite ? "#F59E0B" : "transparent"} />
        </button>

        {/* Bouton dark/light mode */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          {darkMode ? <Sun className="text-white" /> : <Moon />}
        </button>

        {/* Menu hamburger */}
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>

        {/* Photo de profil */}
        <div className="relative" data-aos="fade-left" data-aos-delay="400">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 cursor-pointer">
            <img
              className="w-full h-full object-cover"
              src="images/default.jpeg"
              alt="Photo de profil"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='40' r='20' fill='%23ddd'/%3E%3Ccircle cx='50' cy='100' r='30' fill='%23ddd'/%3E%3C/svg%3E";
              }}
            />
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
        </div>
      </div>

      {/* Dropdown menu - Contenu EXACTEMENT comme dans votre version */}
      {isDropdownOpen && (
        <div className="absolute top-14 right-4 z-50 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              Bonnie Green
            </span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
              name@flowbite.com
            </span>
          </div>
          <ul className="py-2">
            <li>
              <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Accueil
              </a>
            </li>
            <li>
              <a href="/catalogue" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Catalogue
              </a>
            </li>
            <li>
              <a href="/connexion" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Connexion
              </a>
            </li>
            <li>
              <a href="/inscription" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Inscription
              </a>
            </li>
            <li>
              <a href="/panier" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Panier
              </a>
            </li>
            <li>
              <a href="/tableau_de_bord" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Tableau de bord
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}