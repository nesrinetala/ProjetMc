import "./Home.css";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <section className="banner">
        <h1 className="banner-title">Bienvenue chez Cosmétiques Beauté</h1>
        <p className="banner-text">Découvrez nos produits exclusifs pour révéler votre beauté.</p>
        <div className="banner-buttons">
          <button 
            className="catalogue-button" 
            onClick={() => window.location.href = "/catalogue"}
          >
            Explorer le Catalogue
          </button>
          <button 
            className="signup-button" 
            onClick={() => window.location.href = "/inscription"}
          >
            S&apos;inscrire
          </button>
        </div>
      </section>

      <section className="popular-products">
        <h2>Produits Populaires</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="/images/produit1.jpg" alt="Produit 1" />
            <h3>Crème Hydratante</h3>
            <p>Prix : 20€</p>
            <button className="add-to-cart-button">Ajouter au Panier</button>
          </div>
          <div className="product-card">
            <img src="/images/produit2.jpg" alt="Produit 2" />
            <h3>Rouge à Lèvres</h3>
            <p>Prix : 15€</p>
            <button className="add-to-cart-button">Ajouter au Panier</button>
          </div>
          <div className="product-card">
            <img src="/images/produit3.jpg" alt="Produit 3" />
            <h3>Sérum Anti-âge</h3>
            <p>Prix : 30€</p>
            <button className="add-to-cart-button">Ajouter au Panier</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
