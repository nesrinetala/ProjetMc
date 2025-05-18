import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { useAuth } from "../Navbar/AuthContext";
import eyeIcon from "/images/eyee.png";
import eyeOpenIcon from "/images/eyeO.png";
import Navbar from "../Navbar/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Données du carrousel beauté
  const carouselData = [
    {
      image: "/images/nyah.png",
      title: "Votre beauté, notre passion",
      text: "Découvrez les produits qui sublimeront votre routine beauté",
      points: ["Soins", "Maquillage", "Accessoires"]
    },
    {
      image: "/images/connexion.jpg",
      title: "Exclusivités et nouveautés",
      text: "Soyez la première à tester nos dernières innovations",
      points: ["Tendances", "Limited Edition", "Nouveautés"]
    },
    {
      image: "/images/bababa.jpg",
      title: "Conseils d'experts",
      text: "Profitez des conseils de nos spécialistes beauté",
      points: ["Personnalisé", "Professionnel", "Adapté"]
    }
  ];

  // Rotation automatique du carrousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [carouselData.length]);

  // Validation de l'email
  useEffect(() => {
    if (email) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setEmailSuccess(isValid);
      setEmailError(isValid ? "" : "Format email invalide");
    } else {
      setEmailSuccess(false);
      setEmailError("");
    }
  }, [email]);

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email requis");
      return;
    }

    if (!password) {
      setPasswordError("Mot de passe requis");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/connexion/', {
        email,
        username: email,
        password
      }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      login({
        email: response.data.email,
        username: response.data.username,
      });

      navigate("/");
    } catch (err) {
      let errorMessage = "Erreur de connexion";
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Email ou mot de passe incorrect";
          setPasswordError("Mot de passe incorrect");
        } else if (err.response.data?.detail) {
          errorMessage = err.response.data.detail;
        }
      }
      setAuthError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans">
      <Navbar/>
      <div className="fixed inset-0 overflow-y-auto pt-16 bg-[#F5F0E6]">
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row w-full max-w-6xl bg-[#E8D5C9] rounded-2xl shadow-lg border border-[#D7A8A2] overflow-hidden"
          >
            {/* Partie formulaire */}
            <div className="w-full lg:w-1/2 p-8 lg:p-10">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-center text-[#B17973] mb-8"
              >
                Connexion Beauté
              </motion.h2>
              
              {/* Message d'erreur d'authentification */}
              {authError && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 bg-[#B17973]/20 border border-[#B17973]/50 rounded-lg"
                >
                  <p className="text-[#5A4A42] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {authError}
                  </p>
                </motion.div>
              )}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center mb-4"
                >
                  <motion.div
                    className="w-8 h-8 border-4 border-[#B17973] border-t-transparent rounded-full animate-spin"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <label className="block text-[#5A4A42] text-lg font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`bg-white/80 p-3 rounded-lg w-full focus:outline-none border-2 ${
                      emailError 
                        ? "border-[#B17973] text-[#5A4A42] placeholder-[#B17973] focus:ring-[#B17973] focus:border-[#B17973]" 
                        : emailSuccess 
                          ? "border-[#8C6A5D] text-[#5A4A42] placeholder-[#8C6A5D] focus:ring-[#8C6A5D] focus:border-[#8C6A5D]" 
                          : "border-[#D7A8A2] text-[#5A4A42] placeholder-[#8C6A5D] focus:ring-[#B17973] focus:border-[#B17973]"
                    } transition-all duration-200`}
                    placeholder="votre@email.com"
                  />
                  {emailError ? (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-[#B17973] flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {emailError}
                    </motion.p>
                  ) : emailSuccess && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-[#8C6A5D] flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Format email valide
                    </motion.p>
                  )}
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <label className="block text-[#5A4A42] text-lg font-medium">Mot de passe</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full p-3 pr-12 bg-white/80 border-2 border-[#D7A8A2] rounded-xl text-[#5A4A42] focus:outline-none focus:ring-2 focus:ring-[#B17973] focus:border-[#B17973] transition-all"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="pointer-events-auto text-[#8C6A5D] hover:text-[#B17973] transition duration-200 bg-transparent p-1 hover:bg-transparent"
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      >
                        <img 
                          src={showPassword ? eyeOpenIcon : eyeIcon} 
                          className="w-6 h-6" 
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                  {passwordError && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-[#B17973] flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {passwordError}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-2"
                >
                  <motion.button
                    type="submit"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    disabled={isLoading}
                    className="w-full bg-[#B17973] text-white p-4 rounded-lg hover:bg-[#D7A8A2] focus:outline-none focus:ring-2 focus:ring-[#B17973] focus:ring-offset-2 transition-all duration-300 shadow-lg font-bold text-lg relative"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Connexion en cours...
                      </div>
                    ) : (
                      "Se connecter"
                    )}
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center pt-4"
                >
                  <p className="text-[#8C6A5D]">
                    Pas encore de compte?{' '}
                    <Link
                      to="/inscription"
                      className="font-medium text-[#B17973] hover:text-[#D7A8A2] transition-colors"
                    >
                      Créer un compte
                    </Link>
                  </p>
                </motion.div>
              </form>
            </div>

            {/* Partie carrousel beauté */}
            <div className="w-full lg:w-1/2 p-0 relative h-[70vh] lg:h-auto flex">
              <div className="relative w-full h-full overflow-hidden bg-[#5A4A42]/20">
                <AnimatePresence mode="wait">
                  {carouselData.map((slide, index) => (
                    currentSlide === index && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="absolute inset-0"
                      >
                        {/* Image avec animation de flou */}
                        <motion.div
                          initial={{ filter: "blur(0px)", scale: 1.15 }}
                          animate={{ filter: "blur(1px)", scale: 1.05 }}
                          transition={{ duration: 8, ease: "linear" }}
                          className="absolute inset-0 flex items-center justify-center bg-black/10"
                        >
                          <img
                            src={slide.image}
                            alt="Produits beauté"
                            className="max-w-full max-h-full object-cover"
                          />
                        </motion.div>
                        
                        {/* Overlay texte avec animations */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-center bg-gradient-to-t from-[#5A4A42]/70 via-[#5A4A42]/50 to-transparent"
                        >
                          <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="text-3xl md:text-4xl font-bold text-white mb-4 font-poppins relative inline-block"
                          >
                            {slide.title}
                            <motion.span
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                              className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B17973] origin-left"
                            />
                          </motion.h3>
                          
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="text-xl text-white/90 max-w-md font-light mb-6"
                          >
                            {slide.text}
                          </motion.p>
                          
                          <motion.div 
                            className="flex flex-col items-center space-y-2"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              hidden: { opacity: 0 },
                              visible: {
                                opacity: 1,
                                transition: {
                                  staggerChildren: 0.2
                                }
                              }
                            }}
                          >
                            {slide.points.map((point, i) => (
                              <motion.div 
                                key={i} 
                                className="flex items-center"
                                variants={{
                                  hidden: { y: 10, opacity: 0 },
                                  visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                      duration: 0.5
                                    }
                                  }
                                }}
                              >
                                <motion.div 
                                  className={`w-2 h-2 rounded-full ${
                                    i === 0 ? 'bg-[#B17973]' : 
                                    i === 1 ? 'bg-[#8C6A5D]' : 'bg-[#D7A8A2]'
                                  } mr-2`}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 1.4 + i * 0.2, type: "spring" }}
                                />
                                <motion.span 
                                  className="text-white/80 font-medium"
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 1.5 + i * 0.2 }}
                                >
                                  {point}
                                </motion.span>
                              </motion.div>
                            ))}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
                
                {/* Indicateurs de slide avec animation */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {carouselData.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full ${
                        currentSlide === index ? 'bg-[#B17973]' : 'bg-[#B17973]/40'
                      }`}
                      initial={{ scale: 0.8 }}
                      animate={{ 
                        scale: currentSlide === index ? 1.2 : 1,
                        width: currentSlide === index ? '1.5rem' : '0.75rem'
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      aria-label={`Aller au slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;