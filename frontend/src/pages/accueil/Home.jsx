import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
<<<<<<< Updated upstream
import { useUser } from "../../context/UserContext";

const Home = () => {
  const { addToWishlist } = useUser();
  const products = [
    { id: 1, name: "Crème Hydratante", price: 20, image: "/images/produit1.jpg" },
    { id: 2, name: "Rouge à Lèvres", price: 15, image: "/images/produit2.jpg" },
    { id: 3, name: "Sérum Anti-âge", price: 30, image: "/images/produit3.jpg" },
    { id: 4, name: "Crème Hydratante", price: 20, image: "/images/aaa.jpg" },
    { id: 5, name: "Rouge à Lèvres", price: 15, image: "/images/bbb.jpg" }
=======
import { useState, useEffect } from "react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const carouselData = [
    {
      image: "/images/imageBanner.png",
      title: "BIENVENUE DANS NOTRE UNIVERS",
      text: "Découvrez des produits d'exception pour une beauté radieuse"
    },
    {
      image: "/images/imageBanner.png",
      title: "NOUVELLE COLLECTION",
      text: "Des innovations qui révolutionnent votre routine beauté"
    },
    {
      image: "/images/imageBanner.png",
      title: "EXPERTISE LUXE",
      text: "Le savoir-faire français au service de votre beauté"
    }
>>>>>>> Stashed changes
  ];

  const products = [
    { id: 1, name: "Crème Hydratante", category: "peau", price: 20, image: "/images/produit1.jpg" },
    { id: 2, name: "Rouge à Lèvres", category: "maquillage", price: 15, image: "/images/produit2.jpg" },
    { id: 3, name: "Sérum Anti-âge", category: "peau", price: 30, image: "/images/produit3.jpg" },
    { id: 4, name: "Masque Nourrissant", category: "peau", price: 25, image: "/images/aaa.jpg" },
    { id: 5, name: "Palette Fard à Paupières", category: "maquillage", price: 35, image: "/images/bbb.jpg" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      
      {/* Carrousel avec hauteur réduite */}
      <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden mt-12"> 
        <AnimatePresence mode="wait">
          {carouselData.map((slide, index) => (
            currentSlide === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 10, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <img
                    src={slide.image}
                    alt="Bannière"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/1600x800/1F2937/FFFFFF?text=Bannière+Luxe";
                      e.target.className = "w-full h-full object-cover bg-gray-800";
                    }}
                  />
                </motion.div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-center items-center text-center px-4">
                  <motion.h3
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                    className="text-3xl lg:text-4xl font-bold text-white mb-6 font-['Playfair_Display'] tracking-wide leading-tight"
                  >
                    {slide.title}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.9, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                      className="block w-1/4 h-1 bg-amber-400 mx-auto mt-4 origin-center" 
                    />
                  </motion.h3>
                  
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-xl text-amber-100 max-w-2xl mx-auto font-light leading-relaxed"
                  >
                    {slide.text}
                  </motion.p>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
<<<<<<< Updated upstream
        
        
=======
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
          {carouselData.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full ${
                currentSlide === index ? 'bg-amber-400' : 'bg-white/30'}
              `}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: currentSlide === index ? 1.3 : 1,
                width: currentSlide === index ? '1.8rem' : '0.7rem'
              }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          ))}
        </div>
>>>>>>> Stashed changes
      </div>

      {/* Section Produits */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="py-16 px-4 max-w-7xl mx-auto"
      >
        <motion.h2 
          className="text-3xl font-bold text-center text-amber-100 mb-12" 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Nos Produits Phares
        </motion.h2>
        
<<<<<<< Updated upstream
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              <Link to={`/productdetails/${product.id}`} className="flex flex-col h-full">
                <div className="w-full pt-[100%] relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-contain p-2"
                  />
                </div>
                <div className="p-3 flex-grow">
                  <h3 className="font-bold text-sm line-clamp-2 mb-1">{product.name}</h3>
                  <p className="text-[#34521C] font-bold text-sm">{product.price}€</p>
                </div>
              </Link>
              <button 
                className="bg-[#B17973] text-white py-1 px-3 mx-2 mb-2 rounded text-sm hover:bg-[#D7A8A2] transition"
                onClick={(e) => {
                  e.preventDefault();
                  addToWishlist(product);
                }}
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-lg"
>>>>>>> Stashed changes
              >
                <Link to={`/productdetails/${product.id}`} className="block h-full">
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
                    
                    {/* Bouton avec la couleur dorée comme vous le souhaitez */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 rounded-lg transition-all font-semibold"
                      style={{
                        background: 'linear-gradient(to right, #D4AF37, #F0E68C)',
                        color: '#000'
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      Ajouter au panier
                    </motion.button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/10 backdrop-blur-sm py-8 border-t border-white/20"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-amber-100">&copy; 2025 Mon Site - Tous droits réservés</p> 
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;