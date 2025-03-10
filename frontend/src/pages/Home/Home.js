
const Home = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-pink-500 text-white shadow-md">
        <nav className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cosmétiques Beauté</h1>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-pink-200">Accueil</a></li>
            <li><a href="/Catalogue/Catalogue" className="hover:text-pink-200">Catalogue</a></li>
            <li><a href="/Connexion/Connexion" className="hover:text-pink-200">Connexion</a></li>
            <li><a href="/Inscription/Inscription" className="hover:text-pink-200">Inscription</a></li>
            <li><a href="/Panier/Panier" className="hover:text-pink-200">Panier (<span id="cart-count">0</span>)</a></li>
            <li><a href="/TableauDeBord/TableauDeBord" className="hover:text-pink-200">Tableau de bord</a></li>
          </ul>
        </nav>
      </header>

      {/* Banner */}
      <section className="bg-pink-200 text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Bienvenue chez Cosmétiques Beauté</h1>
        <p className="mb-6">Découvrez nos produits exclusifs pour révéler votre beauté.</p>
        <div className="space-x-4">
          <button
            onClick={() => window.location.href = "/catalogue"}
            className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
          >
            Explorer le Catalogue
          </button>
          <button
            onClick={() => window.location.href = "/inscription"}
            className="bg-white text-pink-500 py-2 px-4 rounded border border-pink-500 hover:bg-pink-500 hover:text-white"
          >
            S&apos;inscrire
          </button>
        </div>
      </section>

      {/* Popular Products */}
      <section className="max-w-6xl mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Produits Populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="product-card bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="/images/produit1.jpg" alt="Produit 1" className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <h3 className="font-bold">Crème Hydratante</h3>
              <p>Prix : 20€</p>
            </div>
          </div>
          <div className="product-card bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="/images/produit2.jpg" alt="Produit 2" className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <h3 className="font-bold">Rouge à Lèvres</h3>
              <p>Prix : 15€</p>
            </div>
          </div>
          <div className="product-card bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="/images/produit3.jpg" alt="Produit 3" className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <h3 className="font-bold">Sérum Anti-âge</h3>
              <p>Prix : 30€</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
