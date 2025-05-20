import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "material-icons/iconfont/material-icons.css";
import { AuthProvider } from './pages/Navbar/AuthContext';

// Pages imports
import Home from "./pages/accueil/Home";
import Catalogue from "./pages/Catalogue/Catalogue";
import Connexion from "./pages/Connexion/Connexion";
import Inscription from "./pages/Inscription/Inscription";
import Panier from "./pages/Panier/Panier";
import Profil from "./pages/Profil/Profil";
import Paiement from "./pages/Paiement/paiement";
import AddProduct from "./pages/AddProduct/addproduct";
import TableauDeBord from "./pages/TableauDeBord/TableauDeBord";
import ProductDetails from "./pages/productDetails/productDetails";
import ModifierProduit from "./pages/ModifierProduit/ModifierProduit";
import ChangePasswordPage from "./pages/ChangePasswordPage/ChangePasswordPage";
import AjouterProduit from "./pages/AjouterProduit/AjouterProduit";
import Info from "./pages/info/info";
import Livraison from "./pages/livraison/livraison";
import Chatbot from "./pages/chatbot/chatbot";
import Facture from "./pages/facture/facture";
import DashbordAdmin from "./pages/dashbordadmin/dashbordadmin";
import Header from "./pages/Header";
import products from "./data/products";

function Layout() {
  useEffect(() => {
    console.log("✅ Layout chargé !");
  }, []);

  return (
    <div className="page-container">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/productdetails/:id" element={<ProductDetails products={products} />} />
        <Route path="/info" element={<Info />} />
        
        {/* Authenticated User Routes */}
        <Route path="/panier" element={<Panier />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/paiement" element={<Paiement />} />
        <Route path="/tableau-de-bord" element={<TableauDeBord />} />
        <Route path="/changepasswordpage" element={<ChangePasswordPage />} />
        <Route path="/livraison" element={<Livraison />} />
        <Route path="/facture" element={<Facture />} />
        
        {/* Admin Routes */}
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/ajouter-produit" element={<AjouterProduit />} />
        <Route path="/modifier-produit/:id" element={<ModifierProduit />} />
         <Route path="/dashbordadmin" element={<DashbordAdmin />} />
        {/* Other Routes */}
        <Route path="/header" element={<Header />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}

export default App;