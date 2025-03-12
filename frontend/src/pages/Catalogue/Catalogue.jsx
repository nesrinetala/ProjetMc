import { useState } from "react";
import "./Catalogue.css";
import Navbar from "../Navbar/Navbar";

const products = [
  { id: 1, name: "Crème Hydratante", category: "cheveux", price: 20, image: "/images/produit1.jpg" },
  { id: 2, name: "Crème Hydratante", category: "peau", price: 20, image: "/images/produit2.jpg" },
  { id: 3, name: "Crème Hydratante", category: "maquillage", price: 20, image: "/images/produit3.jpg" },
  { id: 4, name: "Crème Hydratante", category: "cheveux", price: 20, image: "/images/produit4.jpg" }
];

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const filterByPrice = (product) => {
    if (priceFilter === "Moins de 20€") return product.price < 20;
    if (priceFilter === "20€ à 50€") return product.price >= 20 && product.price <= 50;
    if (priceFilter === "Plus de 50€") return product.price > 50;
    return true;
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (category === "" || product.category === category) &&
      filterByPrice(product)
  );

  return (
    <div>
        <Navbar/>
    <div className="container">
      <div className="filter-section">
        <button className="filter-button" onClick={() => setCategory("cheveux")}>Cheveux</button>
        <button className="filter-button" onClick={() => setCategory("peau")}>Peau</button>
        <button className="filter-button" onClick={() => setCategory("maquillage")}>Maquillage</button>

        <select className="filter-select" onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="">Prix ▾</option>
          <option value="Moins de 20€">Moins de 20€</option>
          <option value="20€ à 50€">20€ à 50€</option>
          <option value="Plus de 50€">Plus de 50€</option>
        </select>
      </div>

      <div className="catalogue">
        <h2>Catalogue des produits</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button>Rechercher</button>
        </div>
      </div>

      <section className="popular-products">
        <h2>Nos Produits</h2>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Prix : {product.price}€</p>
              <button>Ajouter au panier</button>
            </div>
          ))}
        </div>
      </section>
    </div>
    <footer>
        <p>&copy; 2025 Mon Site - Tous droits réservés</p>
      </footer>
    </div>
  );
}
