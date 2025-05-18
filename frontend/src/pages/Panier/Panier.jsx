import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import { Heart, ChevronRight } from 'lucide-react';

const Panier = () => {
  const [produits, setProduits] = useState([
    { id: 1, nom: "Rouge à lèvres", prix: 15, quantite: 1, image: "/images/produit1.jpg" },
    { id: 2, nom: "Fond de teint", prix: 25, quantite: 1, image: "/images/produit2.jpg" }
  ]);
  const [imgError, setImgError] = useState(false);

  const navigate = useNavigate();

  const updateQuantite = (id, newQuantite) => {
    setProduits(prevProduits =>
      prevProduits.map(produit =>
        produit.id === id ? { ...produit, quantite: Math.max(1, newQuantite) } : produit
      )
    );
  };

  const supprimerProduit = (id) => {
    setProduits(produits.filter(produit => produit.id !== id));
  };

  const totalGeneral = produits.reduce(
    (total, produit) => total + produit.prix * produit.quantite,
    0
  );

  const handleCheckout = () => {
    navigate("/info");
  };

  useEffect(() => {
    // Initialisation AOS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/aos@next/dist/aos.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@next/dist/aos.js';
    script.onload = () => {
      window.AOS.init({
        duration: 800,
        once: true
      });
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="font-sans bg-[#F5F0E6] min-h-screen">
      <Navbar />
      
      <main className="pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Titre */}
        <h2 className="text-4xl font-bold mb-8 text-[#B17973] text-center" data-aos="fade-down">
          Mon Panier
        </h2>

        {/* Tableau des produits */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8" data-aos="fade-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#E8D5C9]">
                <tr>
                  <th className="px-6 py-4 text-left text-[#5A4A42] font-medium">Produit</th>
                  <th className="px-6 py-4 text-left text-[#5A4A42] font-medium">Prix</th>
                  <th className="px-6 py-4 text-left text-[#5A4A42] font-medium">Quantité</th>
                  <th className="px-6 py-4 text-left text-[#5A4A42] font-medium">Total</th>
                  <th className="px-6 py-4 text-left text-[#5A4A42] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D5C9]">
                {produits.map((produit) => (
                  <motion.tr 
                    key={produit.id}
                    className="hover:bg-[#F9F5F0]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                          {imgError ? (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                              <span>Image</span>
                            </div>
                          ) : (
                            <img
                              src={produit.image}
                              alt={produit.nom}
                              className="h-full w-full object-cover"
                              onError={() => setImgError(true)}
                            />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-[#5A4A42]">{produit.nom}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#B17973] font-medium">
                      {produit.prix}€
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={produit.quantite}
                        min="1"
                        onChange={(e) => updateQuantite(produit.id, parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-1 border border-[#D7A8A2] rounded text-center text-[#5A4A42]"
                      />
                    </td>
                    <td className="px-6 py-4 text-[#B17973] font-medium">
                      {(produit.prix * produit.quantite).toFixed(2)}€
                    </td>
                    <td className="px-6 py-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => supprimerProduit(produit.id)}
                        className="text-sm bg-[#F0E2DA] hover:bg-[#D7A8A2] text-[#B17973] px-3 py-1 rounded transition-colors"
                      >
                        Supprimer
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total et boutons */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8" data-aos="fade-up">
          <div className="flex justify-between items-center">
            <div className="text-xl font-medium text-[#5A4A42]">
              Total : <span className="text-2xl font-bold text-[#B17973] ml-2">{totalGeneral.toFixed(2)}€</span>
            </div>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/catalogue')}
                className="px-6 py-2 bg-[#E8D5C9] hover:bg-[#D7A8A2] text-[#5A4A42] rounded-lg transition-colors"
              >
                ← Continuer mes achats
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCheckout}
                className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F0E68C] text-[#5A4A42] font-semibold rounded-lg transition-all"
              >
                Finaliser ma commande
              </motion.button>
            </div>
          </div>
        </div>

        {/* Engagements */}
        <section className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6 text-[#B17973] text-center">Nos Engagements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#B17973]">Livraison rapide</h3>
              <p className="text-[#5A4A42]">
                Toutes nos commandes sont préparées avec soin et expédiées sous 24h.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#B17973]">Paiement sécurisé</h3>
              <p className="text-[#5A4A42]">
                Paiement 100% sécurisé avec cryptage SSL. Aucune information bancaire stockée.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#5A4A42] text-white py-6 text-center">
        <p className="font-bold">&copy; 2025 Mon Site - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default Panier;