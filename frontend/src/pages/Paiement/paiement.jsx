import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./paiement.css"; 
import Navbar from "../Navbar/Navbar";

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

    setMessage("Paiement réussi ! 🎉");

    setTimeout(() => {
      setName("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setMessage("");
      navigate("/confirmation"); 
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/panier"); // Change "/panier" selon la route souhaitée
  };

  return (
    <div className="page-paiement">
      <Navbar />
      <div className="paiement-container">
        <h2>💳 Paiement</h2>
        <form onSubmit={handleSubmit} className="payment-form">
          <label>Nom sur la carte</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Numéro de carte</label>
          <input type="text" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />

          <label>Date d'expiration</label>
          <input type="text" placeholder="MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />

          <label>CVV</label>
          <input type="text" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} required />

          <div className="button-group">
            <button type="submit" className="btn-payer">Payer</button>
            <button type="button" className="btn-annuler" onClick={handleCancel}>Annuler</button>
          </div>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Paiement;
