import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import { ShoppingCart, Heart } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configuration des endpoints
const API_CONFIG = {
  BASE_URL: 'http://localhost:8000/api',
  ENDPOINTS: {
    PRODUCTS: '/produits/',
    FAVORITES: '/favoris/',
    CART: '/panier/ajouter/'
  }
};

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`);
        
        // Formatage des données pour s'assurer de la cohérence
        const formattedProducts = response.data.map(product => ({
          id: product.id,
          name: product.nom || product.name,
          price: product.prix || product.price,
          category: product.categorie || product.category,
          description: product.description,
          image: product.image,
          regularPrice: product.prix_normal || product.regular_price
        }));
        
        setProducts(formattedProducts);
      } catch (error) {
        handleApiError(error, "Erreur lors du chargement du catalogue");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleApiError = (error, context) => {
    let errorMessage = context;
    
    if (error.response) {
      // Erreurs 4xx/5xx
      if (error.response.status === 404) {
        errorMessage = `${context} - Endpoint non trouvé`;
      } else if (error.response.status === 401) {
        errorMessage = "Authentification requise";
      } else {
        errorMessage = error.response.data?.detail || 
                      error.response.data?.message || 
                      error.response.statusText;
      }
    } else if (error.request) {
      // La requête a été faite mais pas de réponse
      errorMessage = `${context} - Pas de réponse du serveur`;
    } else {
      // Erreur lors de la configuration de la requête
      errorMessage = `${context} - ${error.message}`;
    }
    
    toast.error(errorMessage);
    console.error(`${context}:`, error);
  };

  const filterByPrice = (product) => {
    if (priceFilter === "Moins de 20€") return product.price < 20;
    if (priceFilter === "20€ à 50€") return product.price >= 20 && product.price <= 50;
    if (priceFilter === "Plus de 50€") return product.price > 50;
    return true;
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (category === "" || product.category === category) &&
      filterByPrice(product)
  );

  const toggleFavorite = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Veuillez vous connecter pour gérer vos favoris");
      return;
    }

    try {
      const isFavorite = favorites.includes(productId);
      await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FAVORITES}`, 
        {
          produit_id: productId,
          action: isFavorite ? 'supprimer' : 'ajouter'
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setFavorites(prev => 
        isFavorite 
          ? prev.filter(id => id !== productId) 
          : [...prev, productId]
      );
      
      toast.success(
        isFavorite 
          ? 'Produit retiré des favoris' 
          : 'Produit ajouté aux favoris!'
      );
    } catch (error) {
      handleApiError(error, "Erreur lors de la mise à jour des favoris");
    }
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Veuillez vous connecter pour ajouter au panier");
      return;
    }

    try {
      await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CART}`, 
        {
          produit_id: productId,
          quantite: 1
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Produit ajouté au panier avec succès!');
    } catch (error) {
      handleApiError(error, "Erreur lors de l'ajout au panier");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B17973]"></div>
      </div>
    );
  }

  return (
    <div className="font-sans">
      <Navbar />
      <div className="bg-[#F5F0E6] text-[#6D5C54] min-h-screen pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-8"
        >
          {/* Filtres */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory("cheveux")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${category === "cheveux" ? 'bg-[#B17973] text-white' : 'bg-[#E8D5C9] text-[#5A4A42] hover:bg-[#D7A8A2]'}`}
            >
              Cheveux
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory("peau")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${category === "peau" ? 'bg-[#B17973] text-white' : 'bg-[#E8D5C9] text-[#5A4A42] hover:bg-[#D7A8A2]'}`}
            >
              Peau
            </motion.button>
           
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory("maquillage")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${category === "maquillage" ? 'bg-[#B17973] text-white' : 'bg-[#E8D5C9] text-[#5A4A42] hover:bg-[#D7A8A2]'}`}
            >
              Maquillage
            </motion.button>
           
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <select
                onChange={(e) => setPriceFilter(e.target.value)}
                value={priceFilter}
                className="px-4 py-2 pr-8 bg-[#E8D5C9] text-[#5A4A42] rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-[#B17973] border border-[#D7A8A2]"
              >
                <option value="">Tous les prix</option>
                <option value="Moins de 20€">Moins de 20€</option>
                <option value="20€ à 50€">20€ à 50€</option>
                <option value="Plus de 50€">Plus de 50€</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-[#8C6A5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* Barre de recherche */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold text-center text-[#B17973] mb-6">Catalogue des produits</h2>
           
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-auto sm:flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-[#8C6A5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="bg-[#E8D5C9] border border-[#D7A8A2] text-[#5A4A42] text-sm rounded-lg focus:ring-[#B17973] focus:border-[#B17973] block w-full pl-10 p-2.5 placeholder-[#8C6A5D]"
                />
              </div>
            </div>
          </motion.div>

          {/* Produits */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-[#B17973] mb-8">Nos Produits</h2>
           
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-[#8C6A5D] text-xl">Aucun produit ne correspond à votre recherche</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -10 }}
                      className="bg-white rounded-xl overflow-hidden border border-[#E8D5C9] shadow-lg"
                    >
                      <div className="relative h-64 overflow-hidden">
                        {product.image ? (
                          <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-[#8C6A5D]">Image non disponible</span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(product.id);
                            }}
                            className={`p-2 ${favorites.includes(product.id) ? 'text-[#B17973]' : 'text-[#8C6A5D]'} hover:text-[#B17973] transition bg-white/80 rounded-full`}
                          >
                            <Heart fill={favorites.includes(product.id) ? "#B17973" : "transparent"} size={20} />
                          </button>
                        </div>
                      </div>
                     
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-[#5A4A42] mb-1">{product.name}</h3>
                        <p className="text-[#8C6A5D] text-sm mb-2 capitalize">{product.category}</p>
                        <p className="text-[#8C6A5D] text-sm mb-3 line-clamp-2">{product.description}</p>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <span className="text-lg font-bold text-[#B17973]">{product.price.toFixed(2)}€</span>
                            {product.regularPrice && (
                              <span className="text-sm text-[#8C6A5D] line-through ml-2">{product.regularPrice.toFixed(2)}€</span>
                            )}
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-full bg-[#B17973] text-white"
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product.id);
                            }}
                          >
                            <ShoppingCart size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.section>
        </motion.div>

        {/* Footer */}
        <footer className="text-center py-5 bg-[#5A4A42] text-white font-bold">
          <p>&copy; 2025 Mon Site - Tous droits réservés</p>
        </footer>
      </div>
    </div>
  );
}