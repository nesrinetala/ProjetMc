import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import Navbar from "../Navbar/Navbar";
import "./TableauDeBord.css";

const AnimatedCircle = ({ percentage, color, label, description }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(label);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [label]);

  const strokeDasharray = 352;
  const strokeDashoffset = isVisible
    ? strokeDasharray - (strokeDasharray * percentage) / 100
    : strokeDasharray;

  return (
    <div className="stat-card">
      <div className="progress-container">
        <svg width="180" height="180" viewBox="0 0 120 120" id={label}>
          <circle cx="60" cy="60" r="56" stroke="#cecece" strokeWidth="6" fill="none" />
          <motion.circle
            cx="60"
            cy="60"
            r="56"
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: strokeDasharray }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="progress-text" style={{ color }}>
          <h2 className="progress-label">
            {isVisible && <CountUp start={0} end={percentage} duration={1.5} />}%
          </h2>
          <p className="progress-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

AnimatedCircle.propTypes = {
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default function TableauDeBord() {
  const [modalOpen, setModalOpen] = useState(false);
  const [productImage, setProductImage] = useState(null); // Déclaration ici dans le composant

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Récupère le fichier sélectionné
    if (file) {
      setProductImage(URL.createObjectURL(file)); // Crée une URL temporaire pour afficher l'image
    }
  };

  const stats = [
    { percentage: 100, color: "#ffc107", label: "Total des ventes", description: "250 ventes réalisées" },
    { percentage: 100, color: "#377dff", label: "Revenus générés", description: "1 500 000 DA gagnés" },
    { percentage: 15, color: "#de4437", label: "Commandes en attente", description: "15 en attente" },
    { percentage: 92, color: "#00c9a7", label: "Commandes expédiées", description: "230 livrées" },
  ];

  const products = [
    {
      id: 1,
      name: "Produit 1",
      description: "Description du produit 1...",
      price: "20€",
      stock: "8",
      image: "/images/produit1.jpg",
    },
    {
      id: 2,
      name: "Produit 2",
      description: "Description du produit 2...",
      price: "30€",
      stock: "5",
      image: "/images/produit2.jpg",
    },
    {
      id: 3,
      name: "Produit 3",
      description: "Description du produit 1...",
      price: "20€",
      stock: "8",
      image: "/images/produit3.jpg",
    },
    {
      id: 4,
      name: "Produit 4",
      description: "Description du produit 2...",
      price: "30€",
      stock: "5",
      image: "/images/produit4.jpg",
    },
    {
      id: 5,
      name: "Produit 5",
      description: "Description du produit 2...",
      price: "30€",
      stock: "5",
      image: "/images/produit4.jpg",
    },
    {
      id: 6,
      name: "Produit 6",
      description: "Description du produit 2...",
      price: "30€",
      stock: "5",
      image: "/images/produit4.jpg",
    },
    {
      id: 7,
      name: "Produit 7",
      description: "Description du produit 2...",
      price: "30€",
      stock: "5",
      image: "/images/produit4.jpg",
    },
    {
      id: 8,
      name: "Produit 8",
      description: "Description du produit 2...",
      price: "30€",
      stock: "5",
      image: "/images/produit4.jpg",
    },
  ];

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="container">
        <section className="espace">
          <h2 style={{ color: "#D5C7BC" }}>Statistiques</h2>
          <div className="stats-container">
            {stats.map((stat, index) => (
              <AnimatedCircle key={index} {...stat} />
            ))}
          </div>
        </section>

        <section className="products-section">
          <h2 style={{ color: "#000" }}>Mes Produits</h2>
          <button className="button add-button" onClick={openModal}>
            + Ajouter un produit
          </button>
          <div className="cards-container">
            {products.map((product) => (
              <div className="card" key={product.id}>
                {/* Image du produit */}
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>

                {/* Infos du produit */}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>
                  <strong>Prix :</strong> {product.price}
                </p>
                <p>
                  <strong>Stock :</strong> {product.stock} unités
                </p>

                {/* Actions sur le produit */}
                <div className="card-actions">
                  <button className="button">Voir Détails</button>
                  <button className="button">Modifier</button>
                  <button className="button">Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="orders-section">
          <h2>Commandes Reçues</h2>
          <table className="commandes-table">
            <thead>
              <tr>
                <th>Numéro de Commande</th>
                <th>Client</th>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>Alice</td>
                <td>Produit 1</td>
                <td>2</td>
                <td>
                  <span className="statut attente">En Attente</span>
                </td>
              </tr>
              <tr>
                <td>#002</td>
                <td>Bob</td>
                <td>Produit 2</td>
                <td>1</td>
                <td>
                  <span className="statut expedie">Expédié</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content" style={{ backgroundColor: "var(--blanc-casse)" }}>
            <span className="close" onClick={closeModal} style={{ color: "var(--noir)", fontSize: "28px" }}>
              &times;
            </span>
            <h2 style={{ color: "var(--noir)" }}>Ajouter un Produit</h2>
            <form>
              <input
                type="text"
                placeholder="Nom du produit"
                required
                style={{
                  border: "1px solid var(--gris-anthracite)",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  backgroundColor: "var(--blanc-pur)",
                  color: "var(--noir)",
                }}
              />
              <input
                type="number"
                placeholder="Prix"
                required
                style={{
                  border: "1px solid var(--gris-anthracite)",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  backgroundColor: "var(--blanc-pur)",
                  color: "var(--noir)",
                }}
              />
              <input
                type="number"
                placeholder="Stock"
                required
                style={{
                  border: "1px solid var(--gris-anthracite)",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  backgroundColor: "var(--blanc-pur)",
                  color: "var(--noir)",
                }}
              />
              <textarea
                placeholder="Description"
                required
                style={{
                  border: "1px solid var(--gris-anthracite)",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "var(--blanc-pur)",
                  color: "var(--noir)",
                }}
              ></textarea>
              <input type="file" onChange={handleImageChange} />
              {productImage && (
                <div className="product-image-preview">
                  <img src={productImage} alt="Preview" width="100%" />
                </div>
              )}
              <button className="button" style={{ marginTop: "20px" }} type="submit">
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
