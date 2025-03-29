import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, ChevronRight } from 'lucide-react';

export default function ProductBeautyPage() {
  const [favorite, setFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  // Données du produit en français
  const product = {
    name: "Sérum Éclat Doré",
    category: "#BeautéPourPeauRadieuse",
    price: 49.99,
    regularPrice: 64.99,
    description: "Notre sérum premium enrichi à l'or 24K et aux peptides stimule la production de collagène pour un teint éclatant et une peau ferme. Formule vegan et non testée sur les animaux.",
    features: [
      "Riche en antioxydants puissants",
      "Hydratation intense pendant 24h",
      "Adapté à tous les types de peau",
      "Sans parabènes ni sulfates nocifs"
    ],
    image: "/images/aaaR.png"
  };

  // Animation au scroll et float
  useEffect(() => {
    // Chargement dynamique de AOS
    const loadAOS = async () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/aos@next/dist/aos.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/aos@next/dist/aos.js';
      script.onload = () => {
        window.AOS.init({
          duration: 1400,
          once: true,
          offset: 100,
        });
      };
      document.body.appendChild(script);

      return () => {
        document.head.removeChild(link);
        document.body.removeChild(script);
      };
    };

    loadAOS();

    // Chargement des icônes Remix
    const remixIcons = document.createElement('link');
    remixIcons.href = 'https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css';
    remixIcons.rel = 'stylesheet';
    document.head.appendChild(remixIcons);

    // Animation float
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      .float-animation {
        animation: float 6s ease-in-out infinite;
      }
      .image-fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F5F0E6;
        color: #6D5C54;
        font-size: 1.25rem;
        height: 500px;
        max-height: 500px;
        width: 100%;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(remixIcons);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="font-sans">
      <Navbar />
      <div className="bg-[#F5F0E6] text-[#6D5C54] min-h-screen pt-20">
        {/* Hero Section */}
        <section 
          className="py-20 px-4 md:px-14 bg-gradient-to-r from-[#F5F0E6] to-[#E8D9C5]"
          style={{ minHeight: 'calc(100vh - 80px)' }}
        >
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="hero-text">
              <div className="flex justify-between items-start">
                <h5 className="text-[#B17973] text-lg md:text-xl mb-4" data-aos="fade-right" data-aos-delay="200">
                  {product.category}
                </h5>
                <button 
                  onClick={() => setFavorite(!favorite)}
                  className={`p-2 ${favorite ? 'text-[#B17973]' : 'text-[#8C6A5D]'} hover:text-[#B17973] transition`}
                  data-aos="zoom-in-left"
                  data-aos-delay="200"
                >
                  <Heart fill={favorite ? "#B17973" : "transparent"} />
                </button>
              </div>
              
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-[#B17973]"
                data-aos="zoom-in-left" 
                data-aos-delay="300"
                data-aos-duration="1400"
              >
                {product.name}
              </h1>
              <p 
                className="text-[#8C6A5D] max-w-lg mb-8 leading-relaxed"
                data-aos="fade-right" 
                data-aos-delay="400"
                data-aos-duration="1400"
              >
                {product.description}
              </p>

              <div className="flex items-center gap-4 mb-6" data-aos="fade-right" data-aos-delay="500" data-aos-duration="1400">
                <div className="flex items-center border border-[#B17973] rounded-full overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-[#E8D5C9] transition text-[#B17973]"
                  >
                    -
                  </button>
                  <span className="px-4 text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-[#E8D5C9] transition text-[#B17973]"
                  >
                    +
                  </button>
                </div>
                <span className="text-[#8C6A5D]">Quantité</span>
              </div>

              <div className="main-hero flex flex-wrap items-center gap-4" data-aos="flip-down" data-aos-delay="600" data-aos-duration="1400">
                <button className="bg-[#B17973] hover:bg-[#D7A8A2] text-white px-8 py-3 rounded-md flex items-center transition-transform hover:scale-[1.02]">
                  <ShoppingCart className="mr-2" />
                  Ajouter au panier ({(product.price * quantity).toFixed(2)}€)
                </button>
                <div className="text-2xl font-bold text-[#B17973]">
                  {product.price.toFixed(2)}€ | <span className="text-[#B17973] text-base font-normal ml-2">Prix normal {product.regularPrice.toFixed(2)}€</span>
                </div>
              </div>

              <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3" data-aos="fade-up" data-aos-delay="700" data-aos-duration="1400">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center" data-aos="fade-in" data-aos-delay={800 + index * 100}>
                    <span className="w-2 h-2 bg-[#B17973] rounded-full mr-3"></span>
                    <span className="text-[#8C6A5D]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image du produit */}
            <div className="hero-img flex justify-center" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="1400">
              {imgError ? (
                <div className="image-fallback">
                  Image non disponible
                </div>
              ) : (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-[500px] object-contain float-animation"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </div>
        </section>

        {/* Réseaux sociaux */}
        <div className="fixed left-4 md:left-8 top-1/2 transform -translate-y-1/2 hidden md:block">
          <div className="flex flex-col space-y-6">
            <a href="#" className="text-[#B17973] hover:text-[#D7A8A2] transition text-xl" data-aos="fade-in" data-aos-delay="600">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="#" className="text-[#B17973] hover:text-[#D7A8A2] transition text-xl" data-aos="fade-in" data-aos-delay="700">
              <i className="ri-instagram-line"></i>
            </a>
            <a href="#" className="text-[#B17973] hover:text-[#D7A8A2] transition text-xl" data-aos="fade-in" data-aos-delay="800">
              <i className="ri-pinterest-line"></i>
            </a>
          </div>
        </div>

        {/* Section Détails du Produit */}
        <section id="details" className="py-20 px-4 md:px-14 bg-[#E8D5C9]">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-[#B17973]" data-aos="fade-up">Détails du Produit</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right" data-aos-delay="200">
                <h3 className="text-2xl font-semibold mb-4 text-[#B17973]">Ingrédients</h3>
                <p className="text-[#8C6A5D] mb-6">
                  Notre <span className="text-[#B17973]">Sérum Éclat Doré</span> contient des ingrédients premium comme des nanoparticules d'or 24K, 
                  de l'acide hyaluronique, de la vitamine C et un mélange exclusif d'extraits botaniques 
                  qui travaillent en synergie pour revitaliser votre peau.
                </p>
                
                <h3 className="text-2xl font-semibold mb-4 mt-8 text-[#B17973]">Mode d'emploi</h3>
                <ol className="text-[#8C6A5D] space-y-2">
                  <li className="flex items-start" data-aos="fade-right" data-aos-delay="300">
                    <ChevronRight className="text-[#B17973] mt-1 mr-2 flex-shrink-0" />
                    <span>Appliquer sur peau propre et sèche matin et soir</span>
                  </li>
                  <li className="flex items-start" data-aos="fade-right" data-aos-delay="400">
                    <ChevronRight className="text-[#B17973] mt-1 mr-2 flex-shrink-0" />
                    <span>Utiliser 2-3 gouttes et masser délicatement sur le visage et le cou</span>
                  </li>
                  <li className="flex items-start" data-aos="fade-right" data-aos-delay="500">
                    <ChevronRight className="text-[#B17973] mt-1 mr-2 flex-shrink-0" />
                    <span>Suivre avec votre crème hydratante habituelle</span>
                  </li>
                </ol>
              </div>
              
              <div data-aos="fade-left" data-aos-delay="200">
                <div className="bg-white p-8 rounded-lg border border-[#D7A8A2] shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-[#B17973]">Pourquoi choisir notre <span className="text-[#B17973]">Sérum Éclat Doré</span> ?</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start" data-aos="fade-left" data-aos-delay="300">
                      <div className="bg-[#F0E2DA] p-3 rounded-full mr-4">
                        <Heart className="text-[#B17973]" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 text-[#5A4A42]">Vegan & Cruelty-Free</h4>
                        <p className="text-[#8C6A5D] text-sm">Notre <span className="text-[#B17973]">Sérum Éclat Doré</span> n'est pas testé sur les animaux</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start" data-aos="fade-left" data-aos-delay="400">
                      <div className="bg-[#F0E2DA] p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#B17973]">
                          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 text-[#5A4A42]">Protection UV</h4>
                        <p className="text-[#8C6A5D] text-sm">Le <span className="text-[#B17973]">Sérum Éclat Doré</span> offre une protection naturelle</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start" data-aos="fade-left" data-aos-delay="500">
                      <div className="bg-[#F0E2DA] p-3 rounded-full mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#B17973]">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 text-[#5A4A42]">Absorption rapide</h4>
                        <p className="text-[#8C6A5D] text-sm">Le <span className="text-[#B17973]">Sérum Éclat Doré</span> pénètre rapidement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center py-5 bg-[#5A4A42] text-white font-bold">
          <p>&copy; 2025 Mon Site - Tous droits réservés</p>
        </footer>
      </div>
    </div>
  );
}