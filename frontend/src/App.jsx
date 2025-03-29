import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/accueil/Home";
import Header from './pages/Header';
import Catalogue from './pages/Catalogue/Catalogue';
import Connexion from './pages/Connexion/Connexion';
import Inscription from './pages/Inscription/Inscription';
import Panier from './pages/Panier/Panier';
import TableauDeBord from './pages/TableauDeBord/TableauDeBord';
import ProductDetails from './pages/productDetails/productDetails';
import products from './data/products'; // Importez vos produits

function Layout() {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
  }, []);
  
  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/tableau_de_bord" element={<TableauDeBord />} />
        <Route path="/header" element={<Header />} />
        <Route 
          path="/productdetails/:id" 
          element={<ProductDetails products={products} />} 
        />
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