<<<<<<< Updated upstream
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
=======
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import eyeIcon from "/images/eyee.png";
import eyeOpenIcon from "/images/eyeO.png";
>>>>>>> Stashed changes
import Navbar from "../Navbar/Navbar";

<<<<<<< Updated upstream
const Connexion = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (pwd) => {
    if (pwd.length < 8) {
      return "Le mot de passe doit contenir au moins 8 caractères";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  return (
    <div className="connexion-container">
      <Navbar />
      <div className="connexion-content">
        <div className="image-section">
          <img src="/images/nyah.png" alt="Bienvenue chez Cosmétiques Beauté" />
        </div>

        <div className="form-container">
          <h2>Se connecter</h2>
          <form>
            <input type="email" name="email" placeholder="Email" required />
            
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mot de passe"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <span 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            
            {passwordError && (
              <p className="error-message">{passwordError}</p>
            )}

            <button type="submit">Se connecter</button>
          </form>
          <div className="form-links">
            <p>Pas encore de compte ? <Link to="/Inscription">Créer un compte</Link></p>
            <p>
              <a className="forgot-password-btn" onClick={() => setShowModal(true)}>Mot de passe oublié ?</a>
            </p>
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2025 Cosmétiques Beauté. Tous droits réservés.</p>
      </footer>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <FaTimes className="close-icon" onClick={() => setShowModal(false)} />
            <h2>Réinitialiser le mot de passe</h2>
            <p>Entrez votre email pour recevoir un lien de réinitialisation.</p>
            <input type="email" name="reset-email" placeholder="Votre email" required />
            <button>Envoyer</button>
          </div>
        </div>
      )}
=======
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Données du carrousel beauté
  const carouselData = [
    {
      image: "/images/nyah.png",
      title: "Votre beauté, notre passion",
      text: "Découvrez les produits qui sublimeront votre routine beauté",
      points: ["Soins", "Maquillage", "Accessoires"]
    },
    {
      image: "/images/nyah.png",
      title: "Exclusivités et nouveautés",
      text: "Soyez la première à tester nos dernières innovations",
      points: ["Tendances", "Limited Edition", "Nouveautés"]
    },
    {
      image: "/images/nyah.png",
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
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation finale
    let isValid = true;
    
    if (!email) {
      setEmailError("L'email est requis");
      isValid = false;
    } else if (!emailSuccess) {
      setEmailError("Format email invalide");
      isValid = false;
    }
    
    if (!password) {
      setPasswordError("Le mot de passe est requis");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      console.log("Connexion réussie avec:", { email, password });
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4 mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row w-full max-w-6xl bg-white/10 rounded-2xl shadow-2xl border border-white/30 backdrop-blur-lg overflow-hidden"
          >
            {/* Partie formulaire */}
            <div className="w-full lg:w-1/2 p-8 lg:p-10">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-center text-white mb-8"
              >
                Connexion Beauté
              </motion.h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <label className="block text-white text-lg font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`bg-white/20 p-3 rounded-lg w-full focus:outline-none border-2 ${
                      emailError 
                        ? "border-red-400 text-red-100 placeholder-red-300 focus:ring-red-300 focus:border-red-400" 
                        : emailSuccess 
                          ? "border-green-400 text-green-100 placeholder-green-300 focus:ring-green-300 focus:border-green-400" 
                          : "border-white/30 text-white placeholder-white/50 focus:ring-pink-300 focus:border-pink-400"
                    } transition-all duration-200`}
                    placeholder="votre@email.com"
                  />
                  {emailError ? (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-red-300 flex items-center"
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
                      className="mt-1 text-sm text-green-300 flex items-center"
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
                  <label className="block text-white text-lg font-medium">Mot de passe</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full p-3 pr-12 bg-white/10 border-2 border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="pointer-events-auto text-white/70 hover:text-white transition duration-200 bg-transparent p-1 hover:bg-transparent"
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
                      className="mt-1 text-sm text-red-300 flex items-center"
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
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white p-4 rounded-lg hover:from-pink-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 shadow-lg font-bold text-lg"
                  >
                    Se connecter
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center pt-4"
                >
                  <p className="text-white/70">
                    Pas encore de compte?{' '}
                    <Link
                      to="/inscription"
                      className="font-medium text-pink-300 hover:text-pink-200 transition-colors"
                    >
                      Créer un compte
                    </Link>
                  </p>
                </motion.div>
              </form>
            </div>

            {/* Partie carrousel beauté avec animations */}
            <div className="w-full lg:w-1/2 p-0 relative h-[70vh] lg:h-auto flex">
              <div className="relative w-full h-full overflow-hidden bg-black/20">
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
                          className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-center bg-gradient-to-t from-black/70 via-black/50 to-transparent"
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
                              className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-400 origin-left"
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
                                    i === 0 ? 'bg-pink-400' : 
                                    i === 1 ? 'bg-purple-400' : 'bg-rose-400'
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
                        currentSlide === index ? 'bg-white' : 'bg-white/40'
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
>>>>>>> Stashed changes
    </div>
  );
}

export default Login;