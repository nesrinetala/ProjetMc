import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AnimatedCircle = ({ percentage, color, label, description }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center w-64 h-64"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <svg width="230" height="230" viewBox="0 0 160 160" aria-label={label}>
            <circle cx="80" cy="80" r={radius} stroke="#D7A8A2" strokeWidth="6" fill="none" />
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              stroke={color}
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl font-bold text-[#5A4A42] leading-tight">
              {isVisible && <CountUp start={0} end={percentage} duration={1.5} />}%
            </h2>
            <p className="text-[#8C6A5D] text-sm mt-2 leading-snug">{description}</p>
          </div>
        </div>
      </motion.div>
      <h3 className="text-xl font-semibold text-[#B17973] mt-4 text-center">{label}</h3>
    </div>
  );
};

AnimatedCircle.propTypes = {
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default function TableauDeBord() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const stats = [
    { percentage: 85, color: "#B17973", label: "Taux de satisfaction", description: "Clients satisfaits" },
    { percentage: 72, color: "#8C6A5D", label: "Objectif mensuel", description: "72% atteint" },
    { percentage: 24, color: "#D7A8A2", label: "Retours produits", description: "24 retours" },
    { percentage: 63, color: "#5A4A42", label: "Nouveaux clients", description: "63 ce mois" },
  ];

  const products = [
    {
      id: 1,
      name: "Crème Hydratante Luxe",
      description: "Hydratation intense 24h - Peaux sèches",
      price: "45€",
      regularPrice: "60€",
      stock: "8",
      image: "/images/produit1.jpg",
    },
    {
      id: 2,
      name: "Sérum Éclat Doré",
      description: "Illumine le teint - Anti-âge",
      price: "60€",
      regularPrice: "75€",
      stock: "5",
      image: "/images/produit2.jpg",
    },
    {
      id: 3,
      name: "Masque Nuit Régénérant",
      description: "Nourriture intensive pendant le sommeil",
      price: "35€",
      regularPrice: "45€",
      stock: "12",
      image: "/images/produit3.jpg",
    },
    {
      id: 4,
      name: "Gommage Doux",
      description: "Exfoliation en douceur - Tous types de peau",
      price: "28€",
      regularPrice: "35€",
      stock: "15",
      image: "/images/produit4.jpg",
    },
  ];

  const toggleFavorite = async (productId) => {
    try {
      const isFavorite = favoriteProducts.includes(productId);
      const newFavorites = isFavorite 
        ? favoriteProducts.filter(id => id !== productId)
        : [...favoriteProducts, productId];
      
      await axios.post('http://localhost:8000/api/favoris/', {
        produit_id: productId,
        action: isFavorite ? 'supprimer' : 'ajouter'
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setFavoriteProducts(newFavorites);
      toast.success(
        isFavorite 
          ? 'Produit retiré des favoris' 
          : 'Produit ajouté aux favoris!',
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } catch (error) {
      toast.error("Erreur lors de la mise à jour des favoris");
      console.error(error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post('http://localhost:8000/api/panier/ajouter/', {
        produit_id: productId,
        quantite: quantity
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      toast.success('Produit ajouté au panier avec succès!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Erreur lors de l'ajout au panier");
      console.error(error);
    }
  };

  return (
    <div className="font-sans bg-[#F5F0E6] text-[#5A4A42] min-h-screen">
      <Navbar />
      
      <main className="pt-20 px-4 md:px-14">
        {/* Section Statistiques */}
        <section className="py-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center text-[#B17973] mb-12"
          >
            Tableau de Bord Beauté
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#E8D5C9] rounded-2xl shadow-lg p-8 border border-[#D7A8A2]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedCircle key={index} {...stat} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section Produits */}
        <section className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#B17973]">Produits en Stock</h2>
            <Link 
              to="/ajouter-produit"
              className="px-6 py-2 rounded-lg font-medium bg-[#B17973] hover:bg-[#D7A8A2] text-white shadow-md transition"
            >
              + Ajouter un produit
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#D7A8A2] hover:border-[#B17973] transition-all"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className={`absolute top-3 right-3 p-2 ${favoriteProducts.includes(product.id) ? 'text-[#B17973]' : 'text-[#8C6A5D]'} hover:text-[#B17973] transition`}
                  >
                    <Heart fill={favoriteProducts.includes(product.id) ? "#B17973" : "transparent"} />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-[#5A4A42]">{product.name}</h3>
                  <p className="text-[#8C6A5D] text-sm mb-3">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-[#B17973] font-bold">{product.price}</span>
                      <span className="text-[#8C6A5D] text-sm ml-2 line-through">{product.regularPrice}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      parseInt(product.stock) > 10 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {product.stock} en stock
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1"
                    >
                      <Link 
                        to={`/productdetails/${product.id}`}
                        className="block py-2 bg-[#F0E2DA] hover:bg-[#E8D5C9] rounded-lg text-[#5A4A42] text-sm text-center"
                      >
                        Détails
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1"
                    >
                      <button 
                        onClick={() => addToCart(product.id)}
                        className="w-full py-2 bg-[#B17973] hover:bg-[#D7A8A2] rounded-lg text-white text-sm text-center flex items-center justify-center"
                      >
                        <ShoppingCart className="mr-1" size={16} />
                        Ajouter
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section Commandes */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-[#B17973] mb-8">Commandes Récentes</h2>
          
          <div className="bg-white rounded-xl overflow-hidden border border-[#D7A8A2]">
            <table className="w-full">
              <thead className="bg-[#E8D5C9]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5A4A42]">N° Commande</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5A4A42]">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5A4A42]">Produits</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5A4A42]">Montant</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5A4A42]">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E2DA]">
                <tr className="hover:bg-[#F5F0E6] transition-colors">
                  <td className="px-6 py-4 font-medium text-[#5A4A42]">#CMD-2023-001</td>
                  <td className="px-6 py-4 text-[#5A4A42]">Sophie Martin</td>
                  <td className="px-6 py-4 text-[#8C6A5D]">Crème Hydratante (x2)</td>
                  <td className="px-6 py-4 text-[#B17973] font-bold">90€</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">Expédié</span>
                  </td>
                </tr>
                <tr className="hover:bg-[#F5F0E6] transition-colors">
                  <td className="px-6 py-4 font-medium text-[#5A4A42]">#CMD-2023-002</td>
                  <td className="px-6 py-4 text-[#5A4A42]">Jean Dupont</td>
                  <td className="px-6 py-4 text-[#8C6A5D]">Sérum Éclat (x1)</td>
                  <td className="px-6 py-4 text-[#B17973] font-bold">60€</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm">En traitement</span>
                  </td>
                </tr>
                <tr className="hover:bg-[#F5F0E6] transition-colors">
                  <td className="px-6 py-4 font-medium text-[#5A4A42]">#CMD-2023-003</td>
                  <td className="px-6 py-4 text-[#5A4A42]">Marie Lambert</td>
                  <td className="px-6 py-4 text-[#8C6A5D]">Masque Nuit (x1), Gommage (x1)</td>
                  <td className="px-6 py-4 text-[#B17973] font-bold">63€</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">En préparation</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 bg-[#5A4A42] text-white font-bold">
        <p>&copy; 2025 LuxeBeauté - Tous droits réservés</p>
      </footer>
    </div>
  );
}