import { useState, useEffect } from "react";
import { ShoppingCart, User, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate("/profil");
    } else {
      navigate("/connexion");
    }
  };
  return (
    <nav className="fixed w-full top-0 left-0 z-50 py-4 px-4 md:px-14 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      {/* Logo avec texte personnalisé */}
      <a href="/" className="flex items-center space-x-3" data-aos="fade-right">
        <span className="logo-glow text-3xl font-serif text-amber-600">Lana Glow</span>
      </a>
      {/* Menu horizontal */}
      <ul className="flex space-x-6 text-sm font-medium">
        <li><a href="/" className="hover:text-gray-600">Accueil</a></li>
        <li><a href="/catalogue" className="hover:text-gray-600">Catalogue</a></li>
        <li><a href="/connexion" className="hover:text-gray-600">Se connecter</a></li>
        <li><a href="/inscription" className="hover:text-gray-600">Inscription</a></li>
        <li><a href="/tableau_de_bord" className="hover:text-gray-600">Tableau de bord</a></li>
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
      {/* Boutons à droite */}
      <div className="flex items-center space-x-4">
        {/* Bouton Panier */}
        <button
          onClick={() => navigate("/panier")}
          className="p-2 text-gray-600 hover:text-black"
        >
          <ShoppingCart className="w-6 h-6" />
        </button>
        {/* Bouton Profil / Connexion */}
        <button
          onClick={() =>navigate("/profil")}
          className="p-2 text-gray-600 hover:text-black"
        >
          <User className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
