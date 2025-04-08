import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Home = () => {
  const { addToWishlist } = useUser();
  const products = [
    { id: 1, name: "Crème Hydratante", price: 20, image: "/images/produit1.jpg" },
    { id: 2, name: "Rouge à Lèvres", price: 15, image: "/images/produit2.jpg" },
    { id: 3, name: "Sérum Anti-âge", price: 30, image: "/images/produit3.jpg" },
    { id: 4, name: "Crème Hydratante", price: 20, image: "/images/aaa.jpg" },
    { id: 5, name: "Rouge à Lèvres", price: 15, image: "/images/bbb.jpg" }
  ];

  return (
    <div className="font-['Poppins'] bg-[#FFFAF0] text-[#12190C]">
      <Navbar />
      
      {/* Solution optimale pour la bannière */}
      <div className="relative w-full bg-[#B17973]">
        {/* Conteneur qui s'adapte à l'image sans espace vide */}
        <div className="flex justify-center">
          <div className="relative" style={{ width: 'fit-content' }}>
            <img 
              src="/images/iiipro.png" 
              alt="Bannière"
              className="block h-auto max-h-[60vh] min-h-[200px]"
              style={{
                width: 'auto',
                maxWidth: '100vw' /* Empêche le débordement horizontal */
              }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/1600x500/B17973/FFFFFF?text=Bannière";
                e.target.className = "block h-auto max-h-[60vh] min-h-[200px] w-auto bg-[#B17973]";
              }}
            />
          </div>
        </div>
        
        
        
      </div>

      {/* Section produits (inchangée) */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-[#34521C] mb-8 text-2xl font-bold text-center">Produits Populaires</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              <Link to={`/productdetails/${product.id}`} className="flex flex-col h-full">
                <div className="w-full pt-[100%] relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-contain p-2"
                  />
                </div>
                <div className="p-3 flex-grow">
                  <h3 className="font-bold text-sm line-clamp-2 mb-1">{product.name}</h3>
                  <p className="text-[#34521C] font-bold text-sm">{product.price}€</p>
                </div>
              </Link>
              <button 
                className="bg-[#B17973] text-white py-1 px-3 mx-2 mb-2 rounded text-sm hover:bg-[#D7A8A2] transition"
                onClick={(e) => {
                  e.preventDefault();
                  addToWishlist(product);
                }}
              >
                Ajouter
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-5 bg-[#12190C] text-white font-bold">
        <p>&copy; 2025 Mon Site - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default Home;