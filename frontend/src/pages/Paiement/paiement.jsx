import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../Navbar/Navbar";
import { ChevronRight } from 'lucide-react';

const Paiement = () => {
  useEffect(() => {
    console.log("✅ Page Paiement chargée !");
  }, []);

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !cardNumber || !expiryDate || !cvv) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    const cardRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!cardRegex.test(cardNumber)) {
      setMessage("Numéro de carte invalide.");
      return;
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiryDate)) {
      setMessage("Date d'expiration invalide.");
      return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      setMessage("CVV invalide.");
      return;
    }

    setMessage("Paiement réussi ! Redirection vers la facture... �");

    // Stocker les infos de paiement temporairement
    const paymentInfo = {
      name,
      cardLastFour: cardNumber.slice(-4),
      date: new Date().toLocaleDateString('fr-FR')
    };
    localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));

    setTimeout(() => {
      navigate("/facture", {
        state: {
          paymentSuccess: true,
          paymentDetails: {
            name,
            cardLastFour: cardNumber.slice(-4),
            date: new Date().toLocaleDateString('fr-FR')
          }
        }
      });
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/panier");
  };

  return (
    <div className="font-sans">
      <Navbar />
      <div className="bg-[#F5F0E6] text-[#6D5C54] min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Stepper */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#D7A8A2] text-[#6D5C54] flex items-center justify-center">1</div>
              <div className="w-16 h-1 bg-[#D7A8A2] mx-2"></div>
              <div className="w-8 h-8 rounded-full bg-[#D7A8A2] text-[#6D5C54] flex items-center justify-center">2</div>
              <div className="w-16 h-1 bg-[#D7A8A2] mx-2"></div>
              <div className="w-8 h-8 rounded-full bg-[#B17973] text-white flex items-center justify-center">3</div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-8 text-[#B17973]">Paiement sécurisé</h2>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border border-[#E8D5C9]">
            <div className="mb-6">
              <label className="block text-[#5A4A42] font-medium mb-2">Nom sur la carte *</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full px-4 py-3 border border-[#E8D5C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17973] text-[#5A4A42] bg-[#F5F0E6]"
                required 
              />
            </div>

            <div className="mb-6">
              <label className="block text-[#5A4A42] font-medium mb-2">Numéro de carte *</label>
              <input 
                type="text" 
                placeholder="1234 5678 9012 3456" 
                value={cardNumber} 
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                  if (value.length <= 19) {
                    setCardNumber(value);
                  }
                }} 
                className="w-full px-4 py-3 border border-[#E8D5C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17973] text-[#5A4A42] bg-[#F5F0E6]"
                required 
              />
              <p className="text-sm text-[#8C6A5D] mt-1 flex items-center">
                <ChevronRight className="w-4 h-4 mr-1 text-[#B17973]" />
                Format: 16 chiffres séparés par des espaces
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#5A4A42] font-medium mb-2">Date d'expiration *</label>
                <input 
                  type="text" 
                  placeholder="MM/AA" 
                  value={expiryDate} 
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 2) {
                      value = value.slice(0, 2) + '/' + value.slice(2, 4);
                    }
                    if (value.length <= 5) {
                      setExpiryDate(value);
                    }
                  }} 
                  className="w-full px-4 py-3 border border-[#E8D5C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17973] text-[#5A4A42] bg-[#F5F0E6]"
                  required 
                />
              </div>

              <div>
                <label className="block text-[#5A4A42] font-medium mb-2">CVV *</label>
                <input 
                  type="password" 
                  placeholder="123" 
                  value={cvv} 
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 3) {
                      setCvv(value);
                    }
                  }} 
                  className="w-full px-4 py-3 border border-[#E8D5C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B17973] text-[#5A4A42] bg-[#F5F0E6]"
                  required 
                />
                <p className="text-sm text-[#8C6A5D] mt-1 flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1 text-[#B17973]" />
                  3 chiffres au dos de votre carte
                </p>
              </div>
            </div>

            {message && (
              <div className={`mb-6 p-3 rounded-md ${message.includes("réussi") ? "bg-[#E8F5E9] text-[#2E7D32]" : "bg-[#FFEBEE] text-[#C62828]"}`}>
                {message}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-white border border-[#B17973] text-[#B17973] hover:bg-[#F5F0E6] py-3 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#B17973] focus:ring-offset-2 font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-[#B17973] hover:bg-[#D7A8A2] text-white py-3 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#B17973] focus:ring-offset-2 font-medium"
              >
                Payer 💳
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Paiement;