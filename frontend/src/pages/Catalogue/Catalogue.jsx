import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";

const products = [
  { id: 1, name: "Crème Hydratante", category: "cheveux", price: 15, image: "/images/produit1.jpg" },
  { id: 2, name: "Masque Capillaire", category: "peau", price: 25, image: "/images/produit2.jpg" },
  { id: 3, name: "Fond de Teint", category: "maquillage", price: 35, image: "/images/produit3.jpg" },
  { id: 4, name: "Shampoing", category: "cheveux", price: 18, image: "/images/produit4.jpg" },
  { id: 5, name: "Sérum Visage", category: "peau", price: 55, image: "/images/aaa.jpg" },
  { id: 6, name: "Palette Fard", category: "maquillage", price: 45, image: "/images/bbb.jpg" }
];

export default function Catalogue() {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

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

  return (
    <div>
<<<<<<< Updated upstream
        <Navbar/>
    <div className="container">
      <div className="filter-section">
        <button className="filter-button" onClick={() => setCategory("cheveux")}>Cheveux</button>
        <button className="filter-button" onClick={() => setCategory("peau")}>Peau</button>
        <button className="filter-button" onClick={() => setCategory("maquillage")}>Maquillage</button>
        <button className="filter-button" onClick={() => setCategory("parfum")}>Parfum</button>
        <button className="filter-button" onClick={() => setCategory("corps&bain")}>Corps & Bain</button>
        <button className="filter-button" onClick={() => setCategory("marques")}>Marques</button>
        <button className="filter-button" onClick={() => setCategory("nouveautés")}>Nouveautés</button>
        <select className="filter-select" onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="">Prix ▾</option>
          <option value="Moins de 20€">Moins de 20€</option>
          <option value="20€ à 50€">20€ à 50€</option>
          <option value="Plus de 50€">Plus de 50€</option>
        </select>
      </div>

      <div className="catalogue">
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button>Rechercher</button>
        </div>
      </div>

      <section className="popular-products">
        <h2>Nos Produits</h2>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Prix : {product.price}€</p>
              <button>Ajouter au panier</button>
=======
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 mt-20">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-8 mt-16"
      >
        {/* Filtres */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-row justify-center items-center gap-x-4 mb-8 whitespace-nowrap"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCategory("cheveux")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${category === "cheveux" ? 'bg-pink-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Cheveux
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCategory("peau")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${category === "peau" ? 'bg-pink-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Peau
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCategory("maquillage")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${category === "maquillage" ? 'bg-pink-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Maquillage
          </motion.button>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <select
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 pr-8 bg-white/10 text-white rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="" className="bg-gray-800 text-white">Tous les prix</option>
              <option value="Moins de 20€" className="bg-gray-800 text-white">Moins de 20€</option>
              <option value="20€ à 50€" className="bg-gray-800 text-white">20€ à 50€</option>
              <option value="Plus de 50€" className="bg-gray-800 text-white">Plus de 50€</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
>>>>>>> Stashed changes
            </div>
          </motion.div>
        </motion.div>

        {/* Barre de recherche modifiée */}
<motion.div
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.3 }}
  className="max-w-2xl mx-auto mb-12"
>
  <h2 className="text-3xl font-bold text-center text-white mb-6">Catalogue des produits</h2>
  
  <div className="flex flex-col sm:flex-row items-center gap-4">
    {/* Champ de recherche */}
    <div className="relative w-full sm:w-auto sm:flex-1">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white/50 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
        required
      />
    </div>
    
    {/* Bouton Rechercher */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="submit"
      className="w-full sm:w-auto inline-flex items-center justify-center py-2.5 px-6 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-pink-500 rounded-lg border border-pink-600 hover:from-pink-700 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300"
    >
      <svg className="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      Rechercher
    </motion.button>
  </div>
</motion.div>

        {/* Produits */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-8">Nos Produits</h2>
          
          {filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/70 text-xl">Aucun produit ne correspond à votre recherche</p>
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
                    className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                      <p className="text-pink-300 font-medium mb-4">{product.price}€</p>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-2 rounded-lg hover:from-pink-700 hover:to-pink-600 transition-all"
                      >
                        Ajouter au panier
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.section>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/10 backdrop-blur-sm py-6 border-t border-white/20"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70">&copy; 2025 Mon Site - Tous droits réservés</p>
        </div>
      </motion.footer>
    </div>
    </div>
  );
}