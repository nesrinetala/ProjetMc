import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";  // Nouvelle importation pour React Router v6
import Navbar from "../Navbar/Navbar"; 
import "./Profil.css";

export default function Profil() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("infos");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile"); // Utilisation de navigate au lieu de history.push
  };

  return (
    <>
      <Navbar />
      <div className={`profil-container ${darkMode ? "dark" : ""} pt-24`}>
        <div className="profil-card">
          <div className="profil-header">
            {user && <img src={user.avatar} alt="avatar" className="avatar" />}
            <h2 className="profil-title">{user?.prenom} {user?.nom}</h2>
            <button onClick={handleEditProfile} className="edit-btn">Modifier le profil</button>
          </div>
          <div className="profil-tabs">
            <button 
              onClick={() => setActiveTab("infos")} 
              className={activeTab === "infos" ? "active" : ""}>
              Mes infos
            </button>
            <button 
              onClick={() => setActiveTab("commandes")} 
              className={activeTab === "commandes" ? "active" : ""}>
              Commandes
            </button>
            <button 
              onClick={() => setActiveTab("wishlist")} 
              className={activeTab === "wishlist" ? "active" : ""}>
              Wishlist
            </button>
            <button 
              onClick={() => setActiveTab("parametres")} 
              className={activeTab === "parametres" ? "active" : ""}>
              Paramètres
            </button>
          </div>
          <div className="profil-content">
            {activeTab === "infos" && user && (
              <div className="profil-info">
                <p><span>Nom :</span> {user.nom}</p>
                <p><span>Prénom :</span> {user.prenom}</p>
                <p><span>Email :</span> {user.email}</p>
                <p><span>Téléphone :</span> {user.telephone}</p>
              </div>
            )}
            {activeTab === "commandes" && (
              <p className="profil-loading">Aucune commande pour le moment.</p>
            )}
            {activeTab === "wishlist" && (
              <p className="profil-loading">Votre wishlist est vide.</p>
            )}
            {activeTab === "parametres" && (
              <p className="profil-loading">Paramètres à venir 💫</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
