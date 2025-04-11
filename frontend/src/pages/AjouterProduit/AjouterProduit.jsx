import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";

export default function AjouterProduit() {
  const [productImage, setProductImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProductImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'ajout ici
    navigate('/tableau_de_bord');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white mt-11">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* En-tête sans bouton fermer */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-100 mb-4">Ajouter un Nouveau Produit</h1>
          <p className="text-gray-400">Remplissez tous les champs pour créer votre produit</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section Informations principales */}
          <div className="bg-white/5 p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold text-amber-100 mb-6">Informations principales</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nom du produit*</label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                  placeholder="Sérum Éclat Doré"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie*</label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                  placeholder="#BeautéPourPeauRadieuse"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Description détaillée*</label>
                <textarea
                  required
                  rows={5}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                  placeholder="Notre sérum premium enrichi à l'or 24K et aux peptides stimule la production de collagène pour un teint éclatant..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section Prix et Stock */}
          <div className="bg-white/5 p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold text-amber-100 mb-6">Prix et Stock</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prix de vente* (€)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                  placeholder="49.99"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prix normal (€)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                  placeholder="64.99"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Stock initial*</label>
                <input
                  type="number"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                  placeholder="50"
                />
              </div>
            </div>
          </div>

          {/* Section Caractéristiques */}
          <div className="bg-white/5 p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold text-amber-100 mb-6">Caractéristiques</h2>
            
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Caractéristique {item}*
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                    placeholder={item === 1 ? "Riche en antioxydants puissants" : ""}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section Image */}
          <div className="bg-white/5 p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold text-amber-100 mb-6">Image du produit</h2>
            
            <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-amber-400 transition-colors">
              <input 
                type="file" 
                onChange={handleImageChange} 
                className="hidden" 
                id="product-image"
                accept="image/*"
              />
              <label 
                htmlFor="product-image" 
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-lg text-amber-100">
                  {productImage ? "Changer l'image" : "Cliquez pour télécharger une image"}
                </span>
                <span className="text-sm text-gray-400 mt-2">PNG, JPG, JPEG (Max. 5MB)</span>
              </label>
              {productImage && (
                <div className="mt-8">
                  <img 
                    src={productImage} 
                    alt="Preview" 
                    className="max-h-60 mx-auto rounded-lg shadow-lg border border-white/10"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section Détails supplémentaires */}
          <div className="bg-white/5 p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold text-amber-100 mb-6">Détails supplémentaires</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ingrédients*</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                  placeholder="Or 24K, Acide hyaluronique, Vitamine C..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mode d'emploi*</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                  placeholder="1. Appliquer sur peau propre..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-center gap-6 pt-8">
            <motion.button
              type="button"
              onClick={() => navigate('/tableau_de_bord')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-white"
            >
              Annuler
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg"
            >
              Publier le Produit
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}