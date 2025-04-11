// src/pages/Panier/Panier.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";

const Panier = () => {
  const [produits, setProduits] = useState([
    { id: 1, nom: "Rouge à lèvres", prix: 15, quantite: 1, image: "/images/produit1.jpg" },
    { id: 2, nom: "Fond de teint", prix: 25, quantite: 1, image: "/images/produit2.jpg" }
  ]);

  const navigate = useNavigate();

  const updateQuantite = (id, newQuantite) => {
    setProduits((prevProduits) =>
      prevProduits.map((produit) =>
        produit.id === id ? { ...produit, quantite: newQuantite } : produit
      )
    );
  };

  const supprimerProduit = (id) => {
    setProduits(produits.filter((produit) => produit.id !== id));
  };

  const totalGeneral = produits.reduce(
    (total, produit) => total + produit.prix * produit.quantite,
    0
  );

  const handleCheckout = () => {
<<<<<<< Updated upstream
    navigate("/commande"); // Rediriger vers la page de commande
=======
    navigate("/paiement");
>>>>>>> Stashed changes
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16 max-w-7xl"
      >
        <motion.h2 
          className="text-3xl font-bold text-center text-amber-100 mb-12"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          Mon Panier
        </motion.h2>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="border-b border-white/20">
                <th className="px-6 py-4 text-left">Image</th>
                <th className="px-6 py-4 text-left">Produit</th>
                <th className="px-6 py-4 text-left">Prix</th>
                <th className="px-6 py-4 text-left">Quantité</th>
                <th className="px-6 py-4 text-left">Total</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((produit) => (
                <motion.tr 
                  key={produit.id}
                  className="border-b border-white/10 hover:bg-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4">
                    <img 
                      src={produit.image} 
                      alt={produit.nom} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">{produit.nom}</td>
                  <td className="px-6 py-4 text-pink-300">{produit.prix}€</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={produit.quantite}
                      min="1"
                      onChange={(e) => updateQuantite(produit.id, parseInt(e.target.value))}
                      className="bg-white/10 border border-white/20 rounded px-3 py-1 text-white w-16"
                    />
                  </td>
                  <td className="px-6 py-4 text-pink-300">{produit.prix * produit.quantite}€</td>
                  <td className="px-6 py-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => supprimerProduit(produit.id)}
                      className="text-sm bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded transition-colors"
                    >
                      Supprimer
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

<<<<<<< Updated upstream
          <div className="total-section">
            <p>Total : <span className="total-general">{totalGeneral}€</span></p>
            <div className="buttons">
              <a href="/catalogue" className="btn-retour">← Continuer mes achats</a>
              <button className="btn-checkout" onClick={handleCheckout}>Finaliser ma commande</button> {/* Nouveau texte du bouton */}
=======
        <motion.div 
          className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center">
            <p className="text-xl">
              Total : <span className="text-2xl font-bold text-amber-300 ml-2">{totalGeneral}€</span>
            </p>
            
            <div className="flex space-x-4">
              <motion.a
                href="/catalogue"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                ← Continuer mes achats
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCheckout}
                className="px-8 py-2 rounded-lg font-semibold transition-all"
                style={{
                  background: 'linear-gradient(to right, #D4AF37, #F0E68C)',
                  color: '#000'
                }}
              >
                Passer à la caisse
              </motion.button>
>>>>>>> Stashed changes
            </div>
          </div>
        </motion.div>
      </motion.main>

      <motion.footer
        className="bg-white/10 backdrop-blur-sm py-8 border-t border-white/20 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-amber-100">&copy; 2025 Mon Site - Tous droits réservés</p>
        </div>
      </motion.footer>
    </div>
  );
};

<<<<<<< Updated upstream
export default Panier;
=======
export default Panier;
>>>>>>> Stashed changes
