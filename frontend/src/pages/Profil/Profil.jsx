import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import "./Profil.css";

export default function Profil() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("infos");
  const [darkMode, setDarkMode] = useState(false);
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "commandes" && user) {
      fetchCommandes();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/wishlist/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(prev => ({...prev, wishlist: response.data.wishlist}));
      } catch (error) {
        console.error("Erreur lors du chargement de la wishlist:", error);
      }
    };

    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchCommandes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/mes-commandes/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCommandes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes:", error);
    } finally {
      setLoading(false);
    }
  };

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
              <div className="commandes-container">
                {loading ? (
                  <p className="profil-loading">Chargement des commandes...</p>
                ) : commandes.length === 0 ? (
                  <p className="profil-loading">Aucune commande pour le moment.</p>
                ) : (
                  commandes.map((commande) => (
                    <div key={commande.id} className="commande-card">
                      <h3>Commande #{commande.id}</h3>
                      <p>Date: {new Date(commande.date).toLocaleDateString()}</p>
                      <p>Statut: {commande.statut}</p>
                      <p>Livraison: {commande.livraison?.statut || 'Non livré'}</p>
                      
                      <h4>Produits:</h4>
                      <ul>
                        {commande.lignes.map((ligne, index) => (
                          <li key={index}>
                            {ligne.produit_nom} - {ligne.quantite}x {ligne.prix_unitaire}€
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            )}
            {activeTab === "wishlist" && (
              <div className="wishlist-container">
                {user?.wishlist?.length === 0 ? (
                  <p className="profil-loading">Votre wishlist est vide.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {user?.wishlist?.map((product) => (
                      <div key={product.id} className="product-card">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-32 object-contain"
                        />
                        <div className="p-2">
                          <h3 className="font-bold text-sm line-clamp-2">{product.name}</h3>
                          <p className="text-[#34521C] font-bold text-sm">{product.price}€</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
