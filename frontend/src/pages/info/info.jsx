import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ChevronRight } from 'lucide-react';

const Info = () => {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    telephoneSecondaire: "",
    instagram: "",
    facebook: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données soumises :", formData);
    navigate("/livraison");
  };

  return (
    <div className="font-sans">
      <Navbar />
      <div className="bg-[#F5F0E6] text-[#6D5C54] min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Stepper */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#B17973] text-white flex items-center justify-center">1</div>
              <div className="w-16 h-1 bg-[#B17973] mx-2"></div>
              <div className="w-8 h-8 rounded-full bg-[#D7A8A2] text-[#6D5C54] flex items-center justify-center">2</div>
              <div className="w-16 h-1 bg-[#D7A8A2] mx-2"></div>
              <div className="w-8 h-8 rounded-full bg-[#D7A8A2] text-[#6D5C54] flex items-center justify-center">3</div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-8 text-[#B17973]">Informations personnelles</h2>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border border-[#E8D5C9]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="form-group">
                <label className="block text-[#5A4A42] font-medium mb-2">Prénom *</label>
                <input
                  type="text"
                  name="prenom"
                  placeholder="Votre prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#E8D5C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17973] text-[#5A4A42] bg-[#F5F0E6]"
                />
              </div>

              <div className="form-group">
                <label className="block text-[#5A4A42] font-medium mb-2">Nom *</label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Votre nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#E8D5C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17973] text-[#5A4A42] bg-[#F5F0E6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="form-group">
                <label className="block text-[#5A4A42] font-medium mb-2">Téléphone *</label>
                <input
                  type="tel"
                  name="telephone"
                  placeholder="Votre numéro principal"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#E8D5C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17973] text-[#5A4A42] bg-[#F5F0E6]"
                />
              </div>

              <div className="form-group">
                <label className="block text-[#5A4A42] font-medium mb-2">Téléphone secondaire</label>
                <input
                  type="tel"
                  name="telephoneSecondaire"
                  placeholder="Numéro secondaire (optionnel)"
                  value={formData.telephoneSecondaire}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E8D5C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17973] text-[#5A4A42] bg-[#F5F0E6]"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="form-group">
                <label className="block text-[#5A4A42] font-medium mb-2">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  placeholder="@votrecompte"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E8D5C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17973] text-[#5A4A42] bg-[#F5F0E6]"
                />
                <p className="text-sm text-[#8C6A5D] mt-1 flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1 text-[#B17973]" />
                  Facultatif - Pour le suivi de commande
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="form-group">
                <label className="block text-[#5A4A42] font-medium mb-2">Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  placeholder="Votre profil Facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E8D5C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17973] text-[#5A4A42] bg-[#F5F0E6]"
                />
                <p className="text-sm text-[#8C6A5D] mt-1 flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1 text-[#B17973]" />
                  Facultatif - Pour le suivi de commande
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#B17973] hover:bg-[#D7A8A2] text-white py-4 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#B17973] focus:ring-offset-2 font-medium text-lg"
            >
              Continuer vers livraison 🚚
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Info;