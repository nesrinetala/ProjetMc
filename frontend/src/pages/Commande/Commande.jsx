import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { FaCar, FaMapMarkerAlt, FaComment, FaCheck, FaTimes } from "react-icons/fa";
import "./Commande.css";

const Commande = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    telephoneSecondaire: "",
    instagram: "",
    wilaya: "",
    adresse: "",
    remarque: ""
  });

  const wilayas = [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna",
    "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
    "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou",
    "Alger", "Djelfa", "Jijel", "Sétif", "Saïda",
    "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine",
    "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla",
    "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdès",
    "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
    "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma",
    "Aïn Témouchent", "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar",
    "Ouled Djellal", "Béni Abbès", "In Salah", "In Guezzam", "Touggourt",
    "Djanet", "El M'Ghair", "El Meniaa"
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.prenom.trim()) newErrors.prenom = "Prénom requis";
      if (!formData.nom.trim()) newErrors.nom = "Nom requis";
      if (!formData.telephone.trim()) newErrors.telephone = "Téléphone requis";
      else if (!/^[0-9]{10}$/.test(formData.telephone)) {
        newErrors.telephone = "Numéro invalide (10 chiffres)";
      }
    } else if (step === 2) {
      if (!formData.wilaya) newErrors.wilaya = "Wilaya requise";
      if (!formData.adresse.trim()) newErrors.adresse = "Adresse requise";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer les données au serveur ici
    navigate("/paiement");
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <h2>Informations client</h2>
            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                placeholder="Votre prénom"
                value={formData.prenom}
                onChange={handleChange}
                className={errors.prenom ? "error" : ""}
              />
              {errors.prenom && <span className="error-message">{errors.prenom}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Votre nom"
                value={formData.nom}
                onChange={handleChange}
                className={errors.nom ? "error" : ""}
              />
              {errors.nom && <span className="error-message">{errors.nom}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="telephone">Téléphone</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                placeholder="Votre téléphone"
                value={formData.telephone}
                onChange={handleChange}
                className={errors.telephone ? "error" : ""}
              />
              {errors.telephone && <span className="error-message">{errors.telephone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="telephoneSecondaire">Téléphone secondaire</label>
              <input
                type="text"
                id="telephoneSecondaire"
                name="telephoneSecondaire"
                placeholder="Téléphone secondaire"
                value={formData.telephoneSecondaire}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="instagram">Instagram</label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                placeholder="Votre compte instagram"
                value={formData.instagram}
                onChange={handleChange}
              />
            </div>
            <button 
              type="button" 
              className="btn-passer-livraison"
              onClick={handleNextStep}
            >
              <FaCar style={{ marginRight: "10px" }} /> Passer à la livraison
            </button>
          </>
        );
      case 2:
        return (
          <>
            <h2>Détails de livraison</h2>
            <div className="form-group">
              <label htmlFor="wilaya">Wilaya</label>
              <select
                id="wilaya"
                name="wilaya"
                value={formData.wilaya}
                onChange={handleChange}
                className={errors.wilaya ? "error" : ""}
                style={{ width: '100%', padding: '10px', fontSize: '16px' }}
              >
                <option value="">Sélectionnez votre wilaya</option>
                {wilayas.map((wilaya) => (
                  <option key={wilaya} value={wilaya}>
                    {wilaya}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="adresse">Adresse complète</label>
              <div style={{ position: 'relative' }}>
                <FaMapMarkerAlt 
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6c63ff'
                  }} 
                />
              <input
                type="text"
                id="adresse"
                name="adresse"
                placeholder="Votre adresse complète"
                value={formData.adresse}
                onChange={handleChange}
                className={errors.adresse ? "error" : ""}
                style={{ paddingLeft: '35px', width: '100%' }}
              />
              {errors.adresse && <span className="error-message">{errors.adresse}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="remarque">Remarques (optionnel)</label>
              <div style={{ position: 'relative' }}>
                <FaComment 
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6c63ff'
                  }} 
                />
                <textarea
                  id="remarque"
                  name="remarque"
                  placeholder="Remarques supplémentaires..."
                  value={formData.remarque}
                  onChange={handleChange}
                  style={{ 
                    paddingLeft: '35px',
                    width: '100%',
                    minHeight: '100px',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
            <div className="form-actions">
              <button 
                type="button" 
                className="btn-annuler"
                onClick={handlePrevStep}
              >
                <FaTimes style={{ marginRight: "10px" }} /> Annuler
              </button>
              <button 
                type="button" 
                className="btn-confirmer"
                onClick={handleNextStep}
              >
                <FaCheck style={{ marginRight: "10px" }} /> Confirmer
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2>Récapitulatif</h2>
            <div className="recap-section">
              <h3>Informations client</h3>
              <p>Prénom: {formData.prenom}</p>
              <p>Nom: {formData.nom}</p>
              <p>Téléphone: {formData.telephone}</p>
              {formData.telephoneSecondaire && <p>Téléphone secondaire: {formData.telephoneSecondaire}</p>}
              {formData.instagram && <p>Instagram: {formData.instagram}</p>}
            </div>
            <div className="recap-section">
              <h3>Livraison</h3>
              <p>Wilaya: {formData.wilaya}</p>
              <p>Adresse: {formData.adresse}</p>
              {formData.remarque && <p>Remarques: {formData.remarque}</p>}
            </div>
            <button 
              type="submit" 
              className="btn-passer-paiement"
            >
              Passer au paiement
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-commande">
      <Navbar />
      <div className="container">
        <div className="steps">
          <div className={currentStep >= 1 ? "step active" : "step"}>Informations</div>
          <div className={currentStep >= 2 ? "step active" : "step"}>Livraison</div>
          <div className={currentStep >= 3 ? "step active" : "step"}>Paiement</div>
        </div>
        <form onSubmit={handleSubmit}>
          {renderStep()}
        </form>
      </div>
    </div>
  );
};

export default Commande;
