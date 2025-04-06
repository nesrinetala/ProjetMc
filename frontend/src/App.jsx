import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/accueil/Home";
import Header from "./pages/Header";
import Catalogue from "./pages/Catalogue/Catalogue";
import Connexion from "./pages/Connexion/Connexion";
import Inscription from "./pages/Inscription/Inscription";
import Panier from "./pages/Panier/Panier";
import Profil from "./pages/Profil/Profil";
import Paiement from "./pages/Paiement/paiement"; 
import AddProduct from "./pages/AddProduct/addproduct";
import TableauDeBord from "./pages/TableauDeBord/TableauDeBord";
import ProductDetails from "./pages/productDetails/productDetails";
import products from "./data/products"; // Importation des produits

function Layout() {
  useEffect(() => {
    console.log("✅ Layout chargé !");
  }, []);

  return (
    <div className="page-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/paiement" element={<Paiement />} />
        <Route path="/addproduct" element={<AddProduct/>} />
        <Route path="/tableau_de_bord" element={<TableauDeBord />} />
        <Route path="/header" element={<Header />} />
        <Route path="/productdetails/:id" element={<ProductDetails products={products} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
