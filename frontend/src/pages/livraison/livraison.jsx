import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ChevronRight } from 'lucide-react';

const wilayas = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida",
  "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", "Djelfa", "Jijel",
  "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem",
  "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdès", 
  "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", 
  "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane"
];

const getDeliveryFees = (wilaya) => {
  if (wilaya === "Alger") {
    return { bureau: 400, domicile: 600 };
  } else if (["Blida", "Boumerdès", "Tipaza"].includes(wilaya)) {
    return { bureau: 600, domicile: 800 };
  } else {
    return { bureau: 800, domicile: 1200 };
  }
};

const Livraison = () => {
  const [formData, setFormData] = useState({
    wilaya: "",
    adresse: "",
    remarque: "",
    modeLivraison: ""
  });
  
  const [deliveryFees, setDeliveryFees] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "wilaya") {
      if (value) {
        setDeliveryFees(getDeliveryFees(value));
        setFormData(prev => ({ ...prev, modeLivraison: "" }));
      } else {
        setDeliveryFees(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.modeLivraison) {
      alert("Veuillez sélectionner un mode de livraison");
      return;
    }
    console.log("Infos de livraison :", formData);
    navigate("/paiement");
  };

  return (
    <div className="font-sans">
      <Navbar />
      <div className="bg-[#F5F0E6] text-[#6D5C54] min-h-screen pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4 py-8 max-w-2xl"
        >
          {/* Stepper */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#B17973] text-white flex items-center justify-center">1</div>
              <div className="w-16 h-1 bg-[#B17973] mx-2"></div>
              <div className="w-8 h-8 rounded-full bg-[#B17973] text-white flex items-center justify-center">2</div>
              <div className="w-16 h-1 bg-[#D7A8A2] mx-2"></div>
              <div className="w-8 h-8 rounded-full bg-[#D7A8A2] text-[#6D5C54] flex items-center justify-center">3</div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-8 text-[#B17973]">Informations de livraison</h2>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border border-[#E8D5C9]">
            {/* Wilaya Selection */}
            <div className="mb-6">
              <label className="block text-[#5A4A42] font-medium mb-3">Wilaya *</label>
              <select
                name="wilaya"
                value={formData.wilaya}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#E8D5C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17973] text-[#5A4A42] bg-[#F5F0E6]"
              >
                <option value="">Choisissez une wilaya</option>
                {wilayas.map((w, index) => (
                  <option key={index} value={w}>{w}</option>
                ))}
              </select>
            </div>

            {/* Delivery Options */}
            {deliveryFees && (
              <div className="mb-8 p-6 bg-[#F5F0E6] rounded-lg border border-[#E8D5C9]">
                <h3 className="text-xl font-semibold mb-4 text-[#B17973]">Options de livraison</h3>
                
                <div className="space-y-4">
                  <label className="flex items-start space-x-4 p-4 border border-[#E8D5C9] rounded-lg hover:bg-[#F0E2DA] cursor-pointer transition">
                    <input
                      type="radio"
                      name="modeLivraison"
                      value="bureau"
                      checked={formData.modeLivraison === "bureau"}
                      onChange={handleChange}
                      className="mt-1 h-5 w-5 text-[#B17973] focus:ring-[#B17973]"
                      required
                    />
                    <div>
                      <p className="font-medium text-[#5A4A42]">Livraison au bureau</p>
                      <p className="text-[#8C6A5D]">{deliveryFees.bureau} DA</p>
                      <div className="flex items-center mt-2 text-sm text-[#8C6A5D]">
                        <ChevronRight className="w-4 h-4 mr-1 text-[#B17973]" />
                        <span>Livraison en 2-3 jours ouvrables</span>
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-start space-x-4 p-4 border border-[#E8D5C9] rounded-lg hover:bg-[#F0E2DA] cursor-pointer transition">
                    <input
                      type="radio"
                      name="modeLivraison"
                      value="domicile"
                      checked={formData.modeLivraison === "domicile"}
                      onChange={handleChange}
                      className="mt-1 h-5 w-5 text-[#B17973] focus:ring-[#B17973]"
                      required
                    />
                    <div>
                      <p className="font-medium text-[#5A4A42]">Livraison à domicile</p>
                      <p className="text-[#8C6A5D]">{deliveryFees.domicile} DA</p>
                      <div className="flex items-center mt-2 text-sm text-[#8C6A5D]">
                        <ChevronRight className="w-4 h-4 mr-1 text-[#B17973]" />
                        <span>Livraison en 1-2 jours ouvrables</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Address */}
            <div className="mb-6">
              <label className="block text-[#5A4A42] font-medium mb-3">Adresse complète *</label>
              <input
                type="text"
                name="adresse"
                placeholder="Ex: 12 rue des Lilas"
                value={formData.adresse}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#E8D5C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17973] text-[#5A4A42] bg-[#F5F0E6]"
              />
            </div>

            {/* Remarks */}
            <div className="mb-8">
              <label className="block text-[#5A4A42] font-medium mb-3">Remarque (facultatif)</label>
              <textarea
                name="remarque"
                placeholder="Étage, référence, point de repère..."
                value={formData.remarque}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-[#E8D5C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17973] text-[#5A4A42] bg-[#F5F0E6]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#B17973] hover:bg-[#D7A8A2] text-white py-4 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#B17973] focus:ring-offset-2 font-medium text-lg"
            >
              Continuer vers paiement
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Livraison;