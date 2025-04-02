import { useState, useEffect } from "react";
import { Sun, Moon, Menu, ShoppingCart, Heart, User } from "lucide-react";

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
          alt="Logo"
        />
        <span className="text-2xl font-semibold dark:text-white">Lana Glow</span>
      </a>

      {/* Boutons droite */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setFavorite(!favorite)}
          className={`p-2 ${favorite ? 'text-amber-500' : 'text-gray-400'} hover:text-amber-500 transition`}
        >
          <Heart fill={favorite ? "#F59E0B" : "transparent"} />
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <Sun className="text-white" /> : <Moon />}
        </button>

        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>

        <button
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          <ShoppingCart className="w-6 h-6" />
        </button>

        <button
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          <User className="w-6 h-6" />
        </button>
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute top-14 right-4 z-50 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
          </div>
          <ul className="py-2">
            <li><a href="/" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Accueil</a></li>
            <li><a href="/catalogue" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Catalogue</a></li>
            <li><a href="/connexion" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Se connecter</a></li>
            <li><a href="/inscription" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Inscription</a></li>
            <li><a href="/panier" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Panier</a></li>
            <li><a href="/tableau_de_bord" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Tableau de bord</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
