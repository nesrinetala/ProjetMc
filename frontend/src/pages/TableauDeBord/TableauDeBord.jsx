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
          <circle cx="60" cy="60" r="57" stroke="#DCEAF9" strokeWidth="6" fill="none" />
          <motion.circle
            cx="60"
            cy="60"
            r="57"
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

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const stats = [
    { percentage: 100, color: "#809BC4", label: "Total des ventes", description: "250 ventes réalisées" },
    { percentage: 100, color: "#B9B0D6", label: "Revenus générés", description: "1 500 000 DA gagnés" },
    { percentage: 15, color: "#F5CFE9", label: "Commandes en attente", description: "15 en attente" },
    { percentage: 92, color: "#7BB8D9", label: "Commandes expédiées", description: "230 livrées" },
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
  ];

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="container">
        <section>
          <h2 style={{ color: "#809BC4" }}>Statistiques</h2>
          <div className="stats-container">
            {stats.map((stat, index) => (
              <AnimatedCircle key={index} {...stat} />
            ))}
          </div>
        </section>

        <section className="products-section">
          <h2 style={{ color: "#809BC4" }}>Mes Produits</h2>
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
          <div className="modal-content" style={{ backgroundColor: "#DCEAF9" }}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Ajouter un Produit</h2>
            <form>
              <input type="text" placeholder="Nom du produit" required />
              <input type="number" placeholder="Prix" required />
              <input type="number" placeholder="Stock" required />
              <textarea placeholder="Description" required></textarea>
              <button type="submit" className="button" style={{ backgroundColor: "#F5CFE9" }}>
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}

      <footer>
        <p>&copy; 2025 Mon Site - Tous droits réservés</p>
      </footer>
    </div>
  );
}
