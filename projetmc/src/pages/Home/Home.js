import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <header className="header">
        <nav>
          <h1>Cosmétiques Beauté</h1>
          <ul className="menu">
            <li><a href="/">Accueil</a></li>
            <li><a href="/Catalogue/Catalogue">Catalogue</a></li>
            <li><a href="/Connexion/Connexion">Connexion</a></li>
            <li><a href="/Inscription/Inscription">Inscription</a></li>
            <li><a href="/Panier/Panier">Panier (<span id="cart-count">0</span>)</a></li>
            <li><a href="/TableauDeBord/TableauDeBord">Tableau de bord</a></li>
          </ul>
        </nav>
      </header>

      <section className="banner">
        <h1>Bienvenue chez Cosmétiques Beauté</h1>
        <p>Découvrez nos produits exclusifs pour révéler votre beauté.</p>
        <div className="banner-buttons">
          <button onClick={() => window.location.href = "/catalogue"}>Explorer le Catalogue</button>
          <button onClick={() => window.location.href = "/inscription"}>S'inscrire</button>
        </div>
      </section>

      <section className="popular-products">
        <h2>Produits Populaires</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="/images/produit1.jpg" alt="Produit 1" />
            <h3>Crème Hydratante</h3>
            <p>Prix : 20€</p>
          </div>
          <div className="product-card">
            <img src="/images/produit2.jpg" alt="Produit 2" />
            <h3>Rouge à Lèvres</h3>
            <p>Prix : 15€</p>
          </div>
          <div className="product-card">
            <img src="/images/produit3.jpg" alt="Produit 3" />
            <h3>Sérum Anti-âge</h3>
            <p>Prix : 30€</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
