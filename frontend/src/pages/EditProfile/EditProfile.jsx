import React from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom"; // Importation de useNavigate
import Navbar from "../Navbar/Navbar"; 
import "../Profil/Profil.css";

export default function EditProfile() {
  const { user, setUser } = useUser();

  const navigate = useNavigate(); // Initialisation de navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoi des données et navigation vers la page profil après modification
    navigate("/profil"); // Utilisation de navigate au lieu de history
  };

  return (
    <>
      <Navbar />
      <div className="profil-container pt-24">
        <div className="profil-card">
          <h2>Modifier le Profil</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={user.prenom}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={user.nom}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telephone">Téléphone</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={user.telephone}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Enregistrer les modifications</button>
          </form>
        </div>
      </div>
    </>
  );
}
