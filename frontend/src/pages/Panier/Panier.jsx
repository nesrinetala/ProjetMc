import { useState } from "react";
import "./panier.css"; // Importation du fichier CSS
import Navbar from "../Navbar/Navbar";

const Panier = () => {
  const [produits, setProduits] = useState([
    { 
      id: 1, 
      nom: "Rouge à lèvres", 
      prix: 15, 
      quantite: 1, 
      image: "/images/produit1.jpg" 
    },
    { 
      id: 2, 
      nom: "Fond de teint", 
      prix: 25, 
      quantite: 1, 
      image: "/images/produit2.jpg" 
    },
  ]);

  const updateQuantite = (id, newQuantite) => {
    setProduits((prevProduits) =>
      prevProduits.map((produit) =>
        produit.id === id ? { ...produit, quantite: newQuantite } : produit
      )
    );
  };

  const supprimerProduit = (id) => {
    setProduits(produits.filter((produit) => produit.id !== id));
  };

  const totalGeneral = produits.reduce(
    (total, produit) => total + produit.prix * produit.quantite,
    0
  );

  return (
    <div>
        <Navbar/>
    <div className="container">
      <main className="panier">
        <h2>Mon Panier</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Produit</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit) => (
              <tr key={produit.id}>
                <td>
                  <img src={produit.image} alt={produit.nom} className="produit-image"/>
                </td>
                <td>{produit.nom}</td>
                <td>{produit.prix}€</td>
                <td>
                  <input
                    type="number"
                    value={produit.quantite}
                    min="1"
                    onChange={(e) =>
                      updateQuantite(produit.id, parseInt(e.target.value))
                    }
                  />
                </td>
                <td>{produit.prix * produit.quantite}€</td>
                <td>
                  <button onClick={() => supprimerProduit(produit.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-section">
          <p>Total : <span className="total-general">{totalGeneral}€</span></p>
          <div className="buttons">
            <a href="/catalogue">← Continuer mes achats</a>
            <button className="checkout">Passer à la caisse</button>
          </div>
        </div>
      </main>
    </div>
    <footer>
        <p>&copy; 2025 Mon Site - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default Panier;
