// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './pages/Home/Home';
import Catalogue from './pages/Catalogue/Catalogue';
import Connexion from './pages/Connexion/Connexion';
import Inscription from './pages/Inscription/Inscription';
import Panier from './pages/Panier/Panier';
import TableauDeBord from './pages/TableauDeBord/TableauDeBord';
import './App.css'; // Garde ce import pour le style par défaut

function App() {
    return (
        <Router>
            <div>
                <Header /> {/* Le menu reste visible partout */}
                <main className="p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalogue" element={<Catalogue />} />
                        <Route path="/connexion" element={<Connexion />} />
                        <Route path="/inscription" element={<Inscription />} />
                        <Route path="/panier" element={<Panier />} />
                        <Route path="/tableau_de_bord" element={<TableauDeBord />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
