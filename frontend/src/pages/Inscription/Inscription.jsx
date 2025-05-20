import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import eyeIcon from "/images/eyee.png";
import eyeOpenIcon from "/images/eyeO.png";
import Navbar from "../Navbar/Navbar";

function Inscription() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    nom: "",
    email: "",
    telephone: "",  
    password: "",
    confirmPassword: "",
  });

  const [validations, setValidations] = useState({
    nom: false,
    email: false,
    password: {
      length: false,
      lowercase: false,
      specialChar: false,
    },
    confirmPassword: false,
  });

  const [touched, setTouched] = useState({
    nom: false,
    email: false,
    telephone: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  // Données du carrousel modernisées
  const carouselData = [
    {
      image: "/images/miaou.jpg",
      title: "RÉVÉLEZ VOTRE ÉCLAT",
      text: "Votre beauté unique mérite des produits exceptionnels",
      points: ["Skincare premium", "Maquillage longue tenue", "Conseils experts"]
    },
    {
      image: "/images/inscc.jpg",
      title: "BEAUTÉ CONSCIENTE",
      text: "Des formulations propres qui chouchoutent votre peau",
      points: ["100% vegan", "Sans cruauté", "Éco-responsable"]
    },
    {
      image: "/images/mamama.jpg",
      title: "COMMUNAUTÉ LUXE",
      text: "Rejoignez l'élite des passionnés de beauté",
      points: ["Avant-premières", "Coffrets exclusifs", "Masterclass"]
    }
  ];

  // Rotation automatique du carrousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Validations
  useEffect(() => {
    if (touched.nom) {
      const isValid = formData.nom.length >= 2;
      setValidations(prev => ({ ...prev, nom: isValid }));
      setErrors(prev => ({
        ...prev,
        nom: isValid ? "" : "Le nom doit contenir au moins 2 caractères"
      }));
    }
  }, [formData.nom, touched.nom]);

  useEffect(() => {
    if (touched.email) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      setValidations(prev => ({ ...prev, email: isValid }));
      setErrors(prev => ({
        ...prev,
        email: isValid ? "" : "Veuillez entrer un email valide"
      }));
    }
  }, [formData.email, touched.email]);

  useEffect(() => {
    if (touched.password) {
      const newValidations = {
        length: formData.password.length >= 8,
        lowercase: /[a-z]/.test(formData.password),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
      };

      setValidations(prev => ({
        ...prev,
        password: newValidations,
        confirmPassword: formData.password === formData.confirmPassword && formData.confirmPassword !== ""
      }));
      
      setErrors(prev => ({
        ...prev,
        password: Object.values(newValidations).every(v => v) 
          ? "" 
          : "Le mot de passe ne respecte pas les exigences"
      }));
    }
  }, [formData.password, touched.password]);

  useEffect(() => {
    if (touched.confirmPassword) {
      const isValid = formData.password === formData.confirmPassword && formData.confirmPassword !== "";
      setValidations(prev => ({ ...prev, confirmPassword: isValid }));
      setErrors(prev => ({
        ...prev,
        confirmPassword: isValid ? "" : "Les mots de passe ne correspondent pas"
      }));
    }
  }, [formData.confirmPassword, formData.password, touched.confirmPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (!touched[name] && value) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const getInputClass = (name) => {
    const baseClass = "bg-white/10 border-b-2 border-white/20 text-white text-lg p-3 w-full focus:outline-none transition-all duration-300 placeholder-white/40";

    if (!touched[name]) {
      return `${baseClass} focus:border-[#B17973]`;
    }

    if (errors[name]) {
      return `${baseClass} border-red-400 focus:border-red-400`;
    }

    return `${baseClass} border-[#B17973] focus:border-[#B17973]`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    
    // Conversion des noms de champs pour correspondre au backend
    const userData = {
      username: formData.nom,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      telephone: formData.telephone
    };
  
    console.log("Données envoyées:", userData); // Pour débogage
  
    try {
      await axios.post('http://localhost:8000/api/inscription/', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      navigate("/connexion");
    } catch (err) {
      console.error("Erreur complète:", err.response?.data);
      
      let errorMessage = "Erreur lors de l'inscription";
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.detail) {
          errorMessage = err.response.data.detail;
        } else if (typeof err.response.data === 'object') {
          const firstErrorKey = Object.keys(err.response.data)[0];
          if (firstErrorKey) {
            errorMessage = `${firstErrorKey}: ${err.response.data[firstErrorKey][0]}`;
          }
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-['Montserrat'] bg-gradient-to-b from-[#5A4A42] to-[#8C6A5D]">
      <Navbar/>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex flex-col lg:flex-row w-full max-w-7xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl overflow-hidden"
          >
            {/* Partie carrousel (gauche) - Version Luxe */}
            <div className="w-full lg:w-1/2 p-0 relative h-[60vh] lg:h-[800px] flex order-first">
              <div className="relative w-full h-full overflow-hidden">
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
                            alt="Beauté luxe"
                            className="w-full h-full object-cover object-center"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end pb-16 px-12 text-center"
                        >
                          <motion.h3
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                            className="text-3xl lg:text-4xl font-bold text-white mb-4 font-['Playfair_Display'] tracking-wide leading-tight"
                          >
                            {slide.title}
                            <motion.span
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 1.2, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                              className="block w-1/4 h-1 bg-[#B17973] mx-auto mt-4 origin-center"
                            />
                          </motion.h3>

                          <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="text-xl text-white/90 max-w-lg mx-auto font-light mb-8 leading-relaxed"
                          >
                            {slide.text}
                          </motion.p>
                          
                          <motion.div 
                            className="flex flex-col items-center space-y-3"
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
                                variants={{
                                  hidden: { y: 20, opacity: 0 },
                                  visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                      duration: 0.6,
                                      ease: [0.2, 0.8, 0.2, 1]
                                    }
                                  }
                                }}
                                className="flex items-center text-lg"
                              >
                                <motion.div 
                                  className="w-3 h-3 rounded-full bg-[#B17973] mr-3"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 1.4 + i * 0.2, type: "spring" }}
                                />
                                <span className="text-white/90 font-medium tracking-wide">
                                  {point}
                                </span>
                              </motion.div>
                            ))}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
                
                <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
                  {carouselData.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full ${
                        currentSlide === index ? 'bg-[#B17973]' : 'bg-white/30'
                      }`}
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
            </div>

            {/* Partie formulaire (maintenant à droite) */}
            <div className="w-full lg:w-1/2 p-8 lg:p-10 order-last">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-center text-white mb-8"
              >
                Créer un compte
              </motion.h2>
              
              {/* Affichage des erreurs d'API */}
              {apiError && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 bg-red-500/20 border border-red-400/50 rounded-lg"
                >
                  <p className="text-red-100 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {apiError}
                  </p>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nom */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <label className="block text-white text-lg font-medium">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={getInputClass("nom")}
                    placeholder="Votre nom"
                  />
                  {errors.nom && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-red-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.nom}
                    </motion.p>
                  )}
                  {validations.nom && !errors.nom && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-[#B17973] flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Nom valide
                    </motion.p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <label className="block text-white text-lg font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={getInputClass("email")}
                    placeholder="prenom.nom@se.univ-bejaia.dz"
                  />
                  {errors.email ? (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-red-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </motion.p>
                  ) : validations.email && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-[#B17973] flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Format email valide
                    </motion.p>
                  )}
                </motion.div>

                {/* Téléphone */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <label className="block text-white text-lg font-medium">Téléphone</label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={getInputClass("telephone")}
                    placeholder="Votre numéro de téléphone"
                  />
                </motion.div>

                {/* Mot de passe */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <label className="block text-white text-lg font-medium">Mot de passe</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={getInputClass("password")}
                      placeholder="••••••••"
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
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-red-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.password}
                    </motion.p>
                  )}
                </motion.div>

                {/* Exigences mot de passe */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white/5 p-4 rounded-lg"
                >
                  <h2 className="mb-2 text-sm font-semibold text-white/80 uppercase tracking-wider">Exigences du mot de passe:</h2>
                  <ul className="space-y-2 text-sm">
                    <li className={`flex items-center ${validations.password.length ? 'text-[#B17973]' : 'text-white/50'}`}>
                      <span className={`inline-flex items-center justify-center w-5 h-5 mr-2 rounded-full ${validations.password.length ? 'bg-[#B17973]/20' : 'bg-white/10'}`}>
                        {validations.password.length ? (
                          <svg className="w-3 h-3" fill="#B17973" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : null}
                      </span>
                      Au moins 8 caractères
                    </li>
                    <li className={`flex items-center ${validations.password.lowercase ? 'text-[#B17973]' : 'text-white/50'}`}>
                      <span className={`inline-flex items-center justify-center w-5 h-5 mr-2 rounded-full ${validations.password.lowercase ? 'bg-[#B17973]/20' : 'bg-white/10'}`}>
                        {validations.password.lowercase ? (
                          <svg className="w-3 h-3" fill="#B17973" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : null}
                      </span>
                      Au moins une lettre minuscule
                    </li>
                    <li className={`flex items-center ${validations.password.specialChar ? 'text-[#B17973]' : 'text-white/50'}`}>
                      <span className={`inline-flex items-center justify-center w-5 h-5 mr-2 rounded-full ${validations.password.specialChar ? 'bg-[#B17973]/20' : 'bg-white/10'}`}>
                        {validations.password.specialChar ? (
                          <svg className="w-3 h-3" fill="#B17973" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : null}
                      </span>
                      Au moins un caractère spécial (!@#$%^&* etc.)
                    </li>
                  </ul>
                </motion.div>

                {/* Confirmation mot de passe */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-2"
                >
                  <label className="block text-white text-lg font-medium">Confirmer le mot de passe</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={getInputClass("confirmPassword")}
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="pointer-events-auto text-white/70 hover:text-white transition duration-200 bg-transparent p-1 hover:bg-transparent"
                        aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      >
                        <img 
                          src={showConfirmPassword ? eyeOpenIcon : eyeIcon} 
                          className="w-6 h-6" 
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-red-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.confirmPassword}
                    </motion.p>
                  ) : touched.confirmPassword && validations.confirmPassword && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-[#B17973] flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Les mots de passe correspondent
                    </motion.p>
                  )}
                </motion.div>

                {/* Bouton de soumission */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="pt-4"
                >
                  <motion.button
                    type="submit"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#B17973] to-[#8C6A5D] text-white p-4 rounded-lg hover:from-[#D7A8A2] hover:to-[#B17973] focus:outline-none focus:ring-2 focus:ring-[#B17973] focus:ring-offset-2 transition-all duration-300 shadow-lg font-bold text-lg relative"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Inscription en cours...
                      </div>
                    ) : (
                      "S'inscrire"
                    )}
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-center pt-4"
                >
                  <p className="text-white/70">
                    Déjà un compte?{' '}
                    <Link
                      to="/connexion"
                      className="font-medium text-[#B17973] hover:text-[#D7A8A2] transition-colors"
                    >
                      Se connecter
                    </Link>
                  </p>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Inscription;console.log("Données envoyées:", userData); 
console.error("Erreur complète:", err.response?.data);console.log("Données envoyées:", userData); // Pour débogage
console.error("Erreur complète:", err.response?.data);