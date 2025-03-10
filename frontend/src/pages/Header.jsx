import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Mon Site</h1>
            <nav>
                <ul className="flex gap-4">
                    <li><Link to="/" className="hover:text-gray-400">Accueil</Link></li>
                    <li><Link to="./pages/Catalogue/Catalogue" className="hover:text-gray-400">Catalogue</Link></li>
                    <li><Link to="./pages/Connexion/Connexion" className="hover:text-gray-400">Connexion</Link></li>
                    <li><Link to="./pages/Inscription/Inscription" className="hover:text-gray-400">Inscription</Link></li>
                    <li><Link to="./pages/Panier/Panier" className="hover:text-gray-400">Panier</Link></li>
                    <li><Link to="./pages/TableauDeBord/TableauDeBord" className="hover:text-gray-400">Tableau de Bord</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
