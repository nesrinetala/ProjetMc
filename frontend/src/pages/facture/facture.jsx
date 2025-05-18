import { useState } from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FacturePage() {
  const navigate = useNavigate();

  const [facture, setFacture] = useState({
    numero: 'FAC-2025-001',
    date: new Date().toLocaleDateString('fr-FR'),
    client: {
      nom: "Marie Dupont",
      adresse: "123 Rue de la Beauté",
      ville: "75001 Paris",
      email: "marie.dupont@email.com"
    },
    produits: [
      {
        id: 1,
        nom: "Sérum Éclat Doré",
        quantite: 2,
        prixUnitaire: 49.99,
        total: 99.98
      },
      {
        id: 2,
        nom: "Crème Nuit Régénérante",
        quantite: 1,
        prixUnitaire: 39.99,
        total: 39.99
      }
    ],
    sousTotal: 139.97,
    remise: 0,
    tva: 27.99,
    total: 167.96,
    statut: "Payé"
  });

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="font-sans bg-[#F5F0E6] text-[#6D5C54] min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Bouton Annuler */}
        <button 
          onClick={handleCancel}
          className="flex items-center text-[#B17973] hover:text-[#8C6A5D] mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2" size={18} />
          Annuler et retourner à l'accueil
        </button>

        {/* En-tête de la facture */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-bold text-[#B17973] mb-2">Facture</h1>
            <p className="text-[#8C6A5D]">Numéro: {facture.numero}</p>
            <p className="text-[#8C6A5D]">Date: {facture.date}</p>
          </div>
          
          <div className="text-right">
            <div className="w-32 h-32 bg-[#F5F0E6] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="text-[#B17973] w-16 h-16" />
            </div>
            <p className="text-[#8C6A5D] font-medium">Beauté Naturelle</p>
            <p className="text-[#8C6A5D]">123 Avenue des Soins</p>
            <p className="text-[#8C6A5D]">75000 Paris, France</p>
          </div>
        </div>

        {/* Informations client */}
        <div className="mb-12 p-6 bg-[#F5F0E6] rounded-lg">
          <h2 className="text-xl font-semibold text-[#B17973] mb-4">Client</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-[#5A4A42]">Nom:</p>
              <p className="text-[#8C6A5D]">{facture.client.nom}</p>
            </div>
            <div>
              <p className="font-medium text-[#5A4A42]">Email:</p>
              <p className="text-[#8C6A5D]">{facture.client.email}</p>
            </div>
            <div>
              <p className="font-medium text-[#5A4A42]">Adresse:</p>
              <p className="text-[#8C6A5D]">{facture.client.adresse}</p>
            </div>
            <div>
              <p className="font-medium text-[#5A4A42]">Ville:</p>
              <p className="text-[#8C6A5D]">{facture.client.ville}</p>
            </div>
          </div>
        </div>

        {/* Détails des produits */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#B17973] mb-4">Détails de la commande</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#E8D5C9] text-[#5A4A42]">
                  <th className="p-4 text-left rounded-tl-lg">Produit</th>
                  <th className="p-4 text-left">Prix unitaire</th>
                  <th className="p-4 text-left">Quantité</th>
                  <th className="p-4 text-left rounded-tr-lg">Total</th>
                </tr>
              </thead>
              <tbody>
                {facture.produits.map((produit, index) => (
                  <tr key={produit.id} className={`border-b border-[#E8D5C9] ${index === facture.produits.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="p-4 text-[#8C6A5D]">{produit.nom}</td>
                    <td className="p-4 text-[#8C6A5D]">{produit.prixUnitaire.toFixed(2)}€</td>
                    <td className="p-4 text-[#8C6A5D]">{produit.quantite}</td>
                    <td className="p-4 text-[#8C6A5D]">{produit.total.toFixed(2)}€</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totaux */}
        <div className="flex justify-end mb-8">
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <p className="text-right font-medium text-[#5A4A42]">Sous-total:</p>
              <p className="text-[#8C6A5D]">{facture.sousTotal.toFixed(2)}€</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <p className="text-right font-medium text-[#5A4A42]">Remise:</p>
              <p className="text-[#8C6A5D]">{facture.remise.toFixed(2)}€</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <p className="text-right font-medium text-[#5A4A42]">TVA (20%):</p>
              <p className="text-[#8C6A5D]">{facture.tva.toFixed(2)}€</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E8D5C9]">
              <p className="text-right font-bold text-[#B17973]">Total:</p>
              <p className="text-[#B17973] font-bold">{facture.total.toFixed(2)}€</p>
            </div>
          </div>
        </div>

        {/* Statut et mentions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-[#E8D5C9]">
          <div className="mb-4 md:mb-0">
            <span className={`px-4 py-2 rounded-full ${facture.statut === "Payé" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {facture.statut}
            </span>
          </div>
          <div className="text-[#8C6A5D] text-sm">
            <p>Merci pour votre achat !</p>
            <p>Les produits seront expédiés dans les 24-48 heures.</p>
          </div>
        </div>

        {/* Bouton d'impression */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => window.print()}
            className="bg-[#B17973] hover:bg-[#D7A8A2] text-white px-8 py-3 rounded-md transition-transform hover:scale-[1.02]"
          >
            Imprimer la facture
          </button>
        </div>
      </div>
    </div>
  );
}