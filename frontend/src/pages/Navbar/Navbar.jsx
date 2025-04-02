import { useState } from "react";
import { ShoppingCart, Heart, User, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="fixed w-full top-0 left-0 z-50 py-4 px-4 md:px-14 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      {/* Logo */}
      <a href="#" className="flex items-center space-x-3" data-aos="fade-right">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8"
          alt="Logo"
        />
        <span className="text-2xl font-semibold">Lana Glow</span>
      </a>

      {/* Menu horizontal */}
      <ul className="flex space-x-6 text-sm font-medium">
        <li><a href="/" className="hover:text-gray-600">Accueil</a></li>
        <li><a href="/catalogue" className="hover:text-gray-600">Catalogue</a></li>
        <li><a href="/connexion" className="hover:text-gray-600">Se connecter</a></li>
        <li><a href="/inscription" className="hover:text-gray-600">Inscription</a></li>
        <li><a href="/tableau_de_bord" className="hover:text-gray-600">Tableau de bord</a></li>
        <li><a href="/addproduct" className="hover:text-gray-600">AddProduct</a></li>
      </ul>

      {/* Barre de recherche */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher..."
          className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Boutons droite */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setFavorite(!favorite)}
          className={`p-2 ${favorite ? 'text-amber-500' : 'text-gray-400'} hover:text-amber-500 transition`}
        >
          <Heart fill={favorite ? "#F59E0B" : "transparent"} />
        </button>

        {/* Redirection vers le panier */}
        <button
          onClick={() => navigate("/panier")}
          className="p-2 text-gray-600 hover:text-black"
        >
          <ShoppingCart className="w-6 h-6" />
        </button>

        <button
          className="p-2 text-gray-600 hover:text-black"
        >
          <User className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
