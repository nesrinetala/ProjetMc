import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom"; // Ajout pour la navigation

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
            <circle cx="80" cy="80" r={radius} stroke="#4b5563" strokeWidth="6" fill="none" />
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
            <h2 className="text-4xl font-bold text-white leading-tight">
              {isVisible && <CountUp start={0} end={percentage} duration={1.5} />}%
            </h2>
            <p className="text-white text-sm mt-2 leading-snug">{description}</p>
          </div>
        </div>
      </motion.div>
      <h3 className="text-xl font-semibold text-amber-100 mt-4 text-center">{label}</h3>
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
  const stats = [
    { percentage: 100, color: "#D4AF37", label: "Total des ventes", description: "250 ventes" },
    { percentage: 100, color: "#377dff", label: "Revenus générés", description: "1.5M DA" },
    { percentage: 15, color: "#de4437", label: "Commandes en attente", description: "15 en attente" },
    { percentage: 92, color: "#00c9a7", label: "Commandes expédiées", description: "230 livrées" },
  ];

  const products = [
    {
      id: 1,
      name: "Crème Hydratante Luxe",
      description: "Hydratation intense 24h - Peaux sèches",
      price: "45€",
      stock: "8",
      image: "/images/produit1.jpg",
    },
    {
      id: 2,
      name: "Sérum Éclat Doré",
      description: "Illumine le teint - Anti-âge",
      price: "60€",
      stock: "5",
      image: "/images/produit2.jpg",
    },
    {
      id: 3,
      name: "Masque Nuit Régénérant",
      description: "Nourriture intensive pendant le sommeil",
      price: "35€",
      stock: "12",
      image: "/images/produit3.jpg",
    },
    {
      id: 4,
      name: "Gommage Doux",
      description: "Exfoliation en douceur - Tous types de peau",
      price: "28€",
      stock: "15",
      image: "/images/produit4.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white mt-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Section Statistiques */}
        <section className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center text-amber-100 mb-12 drop-shadow-lg"
          >
            Tableau de Bord
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedCircle key={index} {...stat} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section Produits */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-amber-100">Mes Produits</h2>
            <Link 
              to="/ajouter-produit"
              className="px-4 py-2 rounded-lg font-medium bg-amber-500 hover:bg-amber-600 text-white shadow-md"
            >
              + Ajouter un produit
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/10 hover:border-amber-400/30 transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-white">{product.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-amber-400 font-bold">{product.price}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      parseInt(product.stock) > 10 ? 'bg-green-900/30 text-green-300' : 'bg-amber-900/30 text-amber-300'
                    }`}>
                      {product.stock} en stock
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg text-blue-400 text-sm"
                    >
                      <Link to={`/productdetails/${product.id}`}>Détails</Link>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 py-2 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg text-amber-400 text-sm"
                    >
                      <Link to={`/modifier-produit/${product.id}`}>Modifier</Link>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section Commandes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-100 mb-8">Commandes Récentes</h2>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-amber-100">N° Commande</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-amber-100">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-amber-100">Produits</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-amber-100">Montant</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-amber-100">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">#CMD-2023-001</td>
                  <td className="px-6 py-4 text-white">Sophie Martin</td>
                  <td className="px-6 py-4 text-gray-300">Crème Hydratante (x2)</td>
                  <td className="px-6 py-4 text-amber-400 font-bold">90€</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">Expédié</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">#CMD-2023-002</td>
                  <td className="px-6 py-4 text-white">Jean Dupont</td>
                  <td className="px-6 py-4 text-gray-300">Sérum Éclat (x1)</td>
                  <td className="px-6 py-4 text-amber-400 font-bold">60€</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm">En traitement</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">#CMD-2023-003</td>
                  <td className="px-6 py-4 text-white">Marie Lambert</td>
                  <td className="px-6 py-4 text-gray-300">Masque Nuit (x1), Gommage (x1)</td>
                  <td className="px-6 py-4 text-amber-400 font-bold">63€</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">En préparation</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-sm py-8 border-t border-white/20 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-amber-100">&copy; 2025 LuxeBeauté - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}