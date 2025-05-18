import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCart, Heart } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chatbot from "../chatbot/chatbot";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]); // ✅ utilisation dynamique

  const carouselData = [
    {
      image: "/images/imageBanner.png",
      title: "BIENVENUE DANS NOTRE UNIVERS",
      text: "Découvrez des produits d'exception pour une beauté radieuse"
    },
    {
      image: "/images/acccccui.jpg",
      title: "NOUVELLE COLLECTION",
      text: "Des innovations qui révolutionnent votre routine beauté"
    },
    {
      image: "/images/imageBanner.png",
      title: "EXPERTISE LUXE",
      text: "Le savoir-faire français au service de votre beauté"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Chargement des produits depuis l’API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/produits/accueil/');
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleFavorite = async (productId) => {
    try {
      const isFavorite = favorites.includes(productId);
      await axios.post('http://localhost:8000/api/favoris/', {
        produit_id: productId,
        action: isFavorite ? 'supprimer' : 'ajouter'
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setFavorites(prev =>
        isFavorite
          ? prev.filter(id => id !== productId)
          : [...prev, productId]
      );

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

  const addToCart = async (productId) => {
    try {
      await axios.post('http://localhost:8000/api/panier/ajouter/', {
        produit_id: productId,
        quantite: 1
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
    <div className="font-sans relative">
      <Navbar />
      <div className="bg-[#F5F0E6] text-[#6D5C54] min-h-screen pt-20">
        {/* Carrousel */}
        <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
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
                        e.target.src = "https://via.placeholder.com/1600x800/F5F0E6/6D5C54?text=Bannière+Luxe";
                        e.target.className = "w-full h-full object-cover bg-[#F5F0E6]";
                      }}
                    />
                  </motion.div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#5A4A42]/80 via-[#5A4A42]/40 to-transparent flex flex-col justify-center items-center text-center px-4">
                    <motion.h3
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="text-3xl lg:text-4xl font-bold text-[#F5F0E6] mb-6 font-['Playfair_Display'] tracking-wide leading-tight"
                    >
                      {slide.title}
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.9, duration: 1.2 }}
                        className="block w-1/4 h-1 bg-[#B17973] mx-auto mt-4 origin-center"
                      />
                    </motion.h3>

                    <motion.p
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                      className="text-xl text-[#E8D5C9] max-w-2xl mx-auto font-light leading-relaxed"
                    >
                      {slide.text}
                    </motion.p>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
            {carouselData.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full ${currentSlide === index ? 'bg-[#B17973]' : 'bg-[#8C6A5D]/30'}`}
                initial={{ scale: 0.8 }}
                animate={{
                  scale: currentSlide === index ? 1.3 : 1,
                  width: currentSlide === index ? '1.8rem' : '0.7rem'
                }}
                transition={{ type: "spring", stiffness: 400 }}
              />
            ))}
          </div>
        </div>

        {/* Produits */}
        <section className="py-16 px-4 md:px-14 bg-[#F5F0E6]">
          <motion.h2
            className="text-3xl font-bold text-center text-[#B17973] mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Nos Produits Phares
          </motion.h2>

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
                  className="bg-white rounded-xl overflow-hidden border border-[#E8D5C9] shadow-lg"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Link to={`/productdetails/${product.id}`} className="block h-full">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </Link>
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
                    <Link to={`/productdetails/${product.id}`} className="block">
                      <h3 className="text-xl font-bold text-[#5A4A42] mb-1">{product.name}</h3>
                      <p className="text-[#8C6A5D] text-sm mb-2">{product.category}</p>
                      <p className="text-[#8C6A5D] text-sm mb-3 line-clamp-2">{product.description}</p>
                    </Link>

                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <span className="text-lg font-bold text-[#B17973]">{product.price.toFixed(2)}€</span>
                        {product.regularPrice && (
                          <span className="text-sm text-[#8C6A5D] line-through ml-2">{product.regularPrice.toFixed(2)}€</span>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => addToCart(product.id)}
                        className="bg-[#B17973] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow hover:bg-[#a76a65] transition"
                      >
                        <ShoppingCart size={18} />
                        Ajouter
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
      <Chatbot />
    </div>
  );
};

export default Home;
