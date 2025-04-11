import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import eyeIcon from "/images/eyee.png";
import eyeOpenIcon from "/images/eyeO.png";
import Navbar from "../Navbar/Navbar";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (newPassword) {
      setValidations({
        length: newPassword.length >= 8,
        uppercase: /[A-Z]/.test(newPassword),
        lowercase: /[a-z]/.test(newPassword),
        number: /[0-9]/.test(newPassword),
        specialChar: /[!@#$%^&*]/.test(newPassword)
      });
    } else {
      setValidations({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
      });
    }
  }, [newPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    if (!validations.length) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    // Simulation de requête
    setTimeout(() => {
      setSuccess("Mot de passe changé avec succès !");
      setTimeout(() => navigate("/profil"), 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      
      <div className="max-w-md mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mb-4"
            >
              <span className="text-pink-400 text-2xl">🔒</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Changer le mot de passe
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400"
            >
              Sécurisez votre compte avec un nouveau mot de passe
            </motion.p>
          </div>

          {/* Messages d'erreur/succès */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
              >
                <div className="flex items-center text-red-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-3 bg-green-500/20 border border-green-500/30 rounded-lg"
              >
                <div className="flex items-center text-green-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {success}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mot de passe actuel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-white text-lg font-medium mb-2">Mot de passe actuel</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 pr-12 bg-white/10 border-2 border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="pointer-events-auto text-white/70 hover:text-white transition duration-200 bg-transparent p-1"
                    aria-label={showCurrentPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    <img 
                      src={showCurrentPassword ? eyeOpenIcon : eyeIcon} 
                      className="w-6 h-6" 
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Nouveau mot de passe */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-white text-lg font-medium mb-2">Nouveau mot de passe</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 pr-12 bg-white/10 border-2 border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="pointer-events-auto text-white/70 hover:text-white transition duration-200 bg-transparent p-1"
                    aria-label={showNewPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    <img 
                      src={showNewPassword ? eyeOpenIcon : eyeIcon} 
                      className="w-6 h-6" 
                      alt=""
                    />
                  </button>
                </div>
              </div>

              {/* Validation mot de passe */}
              <div className="mt-4 bg-white/5 p-4 rounded-lg border border-white/10">
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">Exigences du mot de passe</h3>
                <ul className="space-y-2">
                  {[
                    { label: "Minimum 8 caractères", valid: validations.length },
                    { label: "Au moins une majuscule", valid: validations.uppercase },
                    { label: "Au moins une minuscule", valid: validations.lowercase },
                    { label: "Au moins un chiffre", valid: validations.number },
                    { label: "Au moins un caractère spécial", valid: validations.specialChar }
                  ].map((item, index) => (
                    <li key={index} className={`flex items-center ${item.valid ? 'text-green-400' : 'text-gray-400'}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 mr-2 ${item.valid ? 'text-green-400' : 'text-gray-500'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        {item.valid ? (
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        ) : (
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        )}
                      </svg>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Confirmation mot de passe */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-white text-lg font-medium mb-2">Confirmer le mot de passe</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 pr-12 bg-white/10 border-2 border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="pointer-events-auto text-white/70 hover:text-white transition duration-200 bg-transparent p-1"
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
            </motion.div>

            {/* Boutons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 pt-4"
            >
              <motion.button
                type="button"
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-white"
              >
                Annuler
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 rounded-lg font-medium bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white shadow-lg"
              >
                Mettre à jour
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;