import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from "../Navbar/Navbar";

export default function ModifierProduit() {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [productImage, setProductImage] = useState(null);

  // Simule le chargement des données du produit
  useEffect(() => {
    // Ici vous feriez un appel API pour récupérer le produit spécifique
    const fetchProduct = async () => {
      // Exemple avec des données mockées
      const mockProduct = {
        id: id,
        name: "Crème Hydratante Luxe",
        category: "#SoinVisage",
        price: 45.00,
        regularPrice: 55.00,
        description: "Hydratation intense 24h - Peaux sèches",
        features: [
          "Riche en acide hyaluronique",
          "Sans parabènes",
          "Convient aux peaux sensibles"
        ],
        stock: 8,
        image: "/images/produit1.jpg",
        ingredients: "Eau, Glycérine, Acide Hyaluronique, Extrait d'Aloe Vera",
        usage: "Appliquer matin et soir sur visage nettoyé"
      };
      setProduct(mockProduct);
      setProductImage(mockProduct.image);
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProductImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous feriez un appel API pour mettre à jour le produit
    console.log("Produit mis à jour:", product);
    navigate('/tableau_de_bord');
  };

  if (!product) return <div className="text-center py-20">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-100 mb-4">Modifier le Produit</h1>
          <p className="text-gray-400">ID: {product.id}</p>
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
                  value={product.name}
                  onChange={(e) => setProduct({...product, name: e.target.value})}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie*</label>
                <input
                  type="text"
                  value={product.category}
                  onChange={(e) => setProduct({...product, category: e.target.value})}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Description*</label>
                <textarea
                  value={product.description}
                  onChange={(e) => setProduct({...product, description: e.target.value})}
                  required
                  rows={5}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                />
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
                  value={product.price}
                  onChange={(e) => setProduct({...product, price: parseFloat(e.target.value)})}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prix normal (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={product.regularPrice}
                  onChange={(e) => setProduct({...product, regularPrice: parseFloat(e.target.value)})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Stock*</label>
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) => setProduct({...product, stock: parseInt(e.target.value)})}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Section Caractéristiques */}
          <div className="bg-white/5 p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold text-amber-100 mb-6">Caractéristiques</h2>
            
            <div className="space-y-4">
              {product.features.map((feature, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Caractéristique {index + 1}*
                  </label>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...product.features];
                      newFeatures[index] = e.target.value;
                      setProduct({...product, features: newFeatures});
                    }}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
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
                  {productImage !== product.image ? "Changer l'image" : "Cliquez pour modifier l'image"}
                </span>
              </label>
              <div className="mt-8">
                <img 
                  src={productImage} 
                  alt="Preview" 
                  className="max-h-60 mx-auto rounded-lg shadow-lg border border-white/10"
                />
              </div>
            </div>
          </div>

          {/* Section Détails supplémentaires */}
          <div className="bg-white/5 p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold text-amber-100 mb-6">Détails supplémentaires</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ingrédients*</label>
                <textarea
                  value={product.ingredients}
                  onChange={(e) => setProduct({...product, ingredients: e.target.value})}
                  required
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mode d'emploi*</label>
                <textarea
                  value={product.usage}
                  onChange={(e) => setProduct({...product, usage: e.target.value})}
                  required
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400"
                />
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
              Enregistrer les modifications
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}