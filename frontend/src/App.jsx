import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/accueil/Home";
import Header from './pages/Header';
import Catalogue from './pages/Catalogue/Catalogue';
import Connexion from './pages/Connexion/Connexion';
import Inscription from './pages/Inscription/Inscription';
import Panier from './pages/Panier/Panier';
import TableauDeBord from './pages/TableauDeBord/TableauDeBord';
import ProductDetails from './pages/productDetails/productDetails';

function Layout() {
  const location = useLocation();
  console.log(location);
  
  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/tableau_de_bord" element={<TableauDeBord />} />
        <Route path="/header" element={<Header />} />
        <Route path="/productdetails" element={<ProductDetails />} />
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
