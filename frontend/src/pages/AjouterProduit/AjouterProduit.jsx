import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/Navbar";
import { Heart } from 'lucide-react';

function Catalogue() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/produits/');
        setProduits(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        toast.error("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B17973]"></div>
    </div>
  );

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
      {produits.map(produit => (
        <motion.div 
          key={produit.id} 
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-48 bg-gray-200 overflow-hidden">
            {produit.image && (
              <img 
                src={produit.image} 
                alt={produit.nom} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#5A4A42] mb-2">{produit.nom}</h3>
            <p className="text-[#8C6A5D] text-sm mb-4 line-clamp-2">{produit.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-[#B17973]">{produit.prix} €</span>
              <button 
                className="text-[#8C6A5D] hover:text-[#B17973] transition-colors"
                aria-label="Ajouter aux favoris"
              >
                <Heart size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function AjouterProduit() {
  const [productImage, setProductImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.warn("L'image ne doit pas dépasser 5MB");
      return;
    }
    if (file) setProductImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      // Informations principales
      formData.append('nom', e.target.elements.nom.value.trim());
      formData.append('description', e.target.elements.description.value.trim());
      formData.append('categorie', e.target.elements.categorie.value);
      
      // Prix et stock
      formData.append('prix', parseFloat(e.target.elements.prix.value).toFixed(2));
      if (e.target.elements.prix_normal.value) {
        formData.append('prix_normal', parseFloat(e.target.elements.prix_normal.value).toFixed(2));
      }
      formData.append('stock', parseInt(e.target.elements.stock.value));
      
      // Caractéristiques
      ['Volume', 'Texture', 'Parfum', 'Type de peau'].forEach((item, index) => {
        formData.append(`caracteristiques[${item.toLowerCase().replace(' ', '_')}]`, 
          e.target.elements[`caracteristique_${index + 1}`].value.trim());
      });
      
      // Détails supplémentaires
      formData.append('ingredients', e.target.elements.ingredients.value.trim());
      formData.append('mode_emploi', e.target.elements.mode_emploi.value.trim());
      
      // Image
      if (e.target.elements['product-image'].files[0]) {
        formData.append('image', e.target.elements['product-image'].files[0]);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Authentification requise");
      }

      // URL MODIFIÉE ICI (retrait de /api/)
      const response = await axios.post('http://localhost:8000/produits/ajouter/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Produit ajouté avec succès! Redirection...', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Réinitialisation et redirection
      setTimeout(() => {
        e.target.reset();
        setProductImage(null);
        navigate('/catalogue');
      }, 2000);
      
    } catch (error) {
      let errorMessage = "Erreur lors de l'ajout du produit";
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Vous devez être connecté pour ajouter un produit";
        } else if (error.response.data) {
          // Gestion des erreurs de validation du serveur
          errorMessage = Object.values(error.response.data).flat().join('\n');
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans bg-[#F5F0E6] text-[#6D5C54] min-h-screen pt-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* En-tête */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-[#B17973] mb-2">Ajouter un Produit</h1>
          <p className="text-[#8C6A5D]">Remplissez le formulaire pour ajouter un nouveau produit</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section Informations principales */}
          <motion.div 
            className="bg-[#E8D5C9] p-8 rounded-xl border border-[#D7A8A2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold text-[#B17973] mb-6">Informations principales</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-[#5A4A42] mb-2">Nom du produit*</label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  minLength={3}
                  maxLength={100}
                  className="w-full bg-[#F5F0E6] border border-[#D7A8A2] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#B17973] text-[#5A4A42]"
                  placeholder="Sérum Éclat Doré"
                />
              </div>
              
              <div>
                <label htmlFor="categorie" className="block text-sm font-medium text-[#5A4A42] mb-2">Catégorie*</label>
                <select
                  id="categorie"
                  name="categorie"
                  required
                  className="w-full bg-[#F5F0E6] border border-[#D7A8A2] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#B17973] text-[#5A4A42]"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="Soins Visage">Soins Visage</option>
                  <option value="Soins Corps">Soins Corps</option>
                  <option value="Maquillage">Maquillage</option>
                  <option value="Parfums">Parfums</option>
                  <option value="Accessoires">Accessoires</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-[#5A4A42] mb-2">Description détaillée*</label>
                <textarea
                  id="description"
                  name="description"
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={5}
                  className="w-full bg-[#F5F0E6] border border-[#D7A8A2] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#B17973] text-[#5A4A42]"
                  placeholder="Notre sérum premium enrichi à l'or 24K et aux peptides stimule la production de collagène pour un teint éclatant..."
                ></textarea>
              </div>
            </div>
          </motion.div>

          {/* Section Prix et Stock */}
          <motion.div 
            className="bg-[#E8D5C9] p-8 rounded-xl border border-[#D7A8A2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-[#B17973] mb-6">Prix et Stock</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="prix" className="block text-sm font-medium text-[#5A4A42] mb-2">Prix de vente* (€)</label>
                <input
                  id="prix"
                  name="prix"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="10000"
                  required
                  className="w-full bg-[#F5F0E6] border border-[#D7A8A2] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#B17973] text-[#5A4A42]"
                  placeholder="49.99"
                />
              </div>
              
              <div>
                <label htmlFor="prix_normal" className="block text-sm font-medium text-[#5A4A42] mb-2">Prix normal (€)</label>
                <input
                  id="prix_normal"
                  name="prix_normal"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10000"
                  className="w-full bg-[#F5F0E6] border border-[#D7A8A2] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#B17973] text-[#5A4A42]"
                  placeholder="64.99"
                />
              </div>
              
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-[#5A4A42] mb-2">Stock initial*</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  max="10000"
                  required
                  className="w-full bg-[#F5F0E6] border border-[#D7A8A2] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#B17973] text-[#5A4A42]"
                  placeholder="50"
                />
              </div>
            </div>
          </motion.div>

          {/* Section Caractéristiques */}
          <motion.div 
            className="bg-[#E8D5C9] p-8 rounded-xl border border-[#D7A8A2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-[#B17973] mb-6">Caractéristiques</h2>
            
            <div className="space-y-4">
              {['Volume', 'Texture', 'Parfum', 'Type de peau'].map((item, index) => (
                <div key={index}>
                  <label htmlFor={`caracteristique_${index + 1}`} className="block text-sm font-medium text-[#5A4A42] mb-2">
                    {item}*
                  </label>
                  <input
                    id={`caracteristique_${index + 1}`}
                    name={`caracteristique_${index + 1}`}
                    type="text"
                    required
                    minLength={2}
                    maxLength={50}
                    className="w-full bg-[#F5F0E6] border border-[#D7A8A2] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#B17973] text-[#5A4A42]"
                    placeholder={`Ex: ${item === 'Volume' ? '50ml' : item === 'Texture' ? 'Liquide' : item === 'Parfum' ? 'Floral' : 'Tous types'}`}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          
          {/* Section Image */}
<motion.div 
  className="bg-[#E8D5C9] p-8 rounded-xl border border-[#D7A8A2]"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4 }}
>
  <h2 className="text-2xl font-semibold text-[#B17973] mb-6">Image du produit</h2>
  
  <div className="border-2 border-dashed border-[#D7A8A2] rounded-xl p-8 text-center hover:border-[#B17973] transition-colors">
    <input 
      type="file" 
      onChange={handleImageChange} 
      className="sr-only"  // Utilisez sr-only au lieu de hidden pour l'accessibilité
      id="product-image"
      name="product-image"
      accept="image/*"
      required
      aria-required="true"
    />
    <label 
      htmlFor="product-image" 
      className="cursor-pointer flex flex-col items-center justify-center"
      tabIndex="0" // Permet au label de recevoir le focus
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          document.getElementById('product-image').click();
        }
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#8C6A5D] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="text-lg text-[#B17973]">
        {productImage ? "Changer l'image" : "Cliquez pour télécharger une image"}
      </span>
      <span className="text-sm text-[#8C6A5D] mt-2">PNG, JPG, JPEG (Max. 5MB)</span>
    </label>
    {productImage && (
      <motion.div 
        className="mt-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src={productImage} 
          alt="Preview" 
          className="max-h-60 mx-auto rounded-lg shadow-lg border border-[#D7A8A2]"
        />
      </motion.div>
    )}
  </div>
</motion.div>

          {/* Section Détails supplémentaires */}
          <motion.div 
            className="bg-[#E8D5C9] p-8 rounded-xl border border-[#D7A8A2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#B17973] mb-6">Détails supplémentaires</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ingredients" className="block text-sm font-medium text-[#5A4A42] mb-2">Ingrédients*</label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  required
                  minLength={10}
                  maxLength={500}
                  rows={4}
                  className="w-full bg-[#F5F0E6] border border-[#D7A8A2] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#B17973] text-[#5A4A42]"
                  placeholder="Or 24K, Acide hyaluronique, Vitamine C..."
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="mode_emploi" className="block text-sm font-medium text-[#5A4A42] mb-2">Mode d'emploi*</label>
                <textarea
                  id="mode_emploi"
                  name="mode_emploi"
                  required
                  minLength={10}
                  maxLength={500}
                  rows={4}
                  className="w-full bg-[#F5F0E6] border border-[#D7A8A2] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#B17973] text-[#5A4A42]"
                  placeholder="1. Appliquer sur peau propre..."
                ></textarea>
              </div>
            </div>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div 
            className="flex justify-center gap-6 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-lg font-medium bg-[#B17973] hover:bg-[#D7A8A2] text-white shadow-lg flex items-center justify-center disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publication...
                </>
              ) : (
                "Publier le Produit"
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}