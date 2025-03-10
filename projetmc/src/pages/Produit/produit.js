// Données fictives pour le produit et les recommandations
const produit = {
    id: 1,
    nom: "Produit Example",
    description: "Ceci est une description détaillée du produit.",
    prix: "50€",
    image: "produit1.jpg"
};

const recommandations = [
    { id: 2, nom: "Produit 2", prix: "30€", image: "produit2.jpg" },
    { id: 3, nom: "Produit 3", prix: "40€", image: "produit3.jpg" },
    { id: 4, nom: "Produit 4", prix: "60€", image: "produit4.jpg" }
];

// Remplir les détails du produit
document.getElementById("product-name").textContent = produit.nom;
document.getElementById("product-description").textContent = produit.description;
document.getElementById("product-price").textContent = "Prix : " + produit.prix;
document.querySelector(".product-image").src = produit.image;

// Générer les produits recommandés
const recommendedContainer = document.getElementById("recommended-products");
recommandations.forEach(produit => {
    const produitDiv = document.createElement("div");
    produitDiv.className = "recommended-item";
    produitDiv.innerHTML = `
        <img src="${produit.image}" alt="${produit.nom}">
        <h4>${produit.nom}</h4>
        <p>${produit.prix}</p>
        <button onclick="voirDetails(${produit.id})">Voir Détails</button>
    `;
    recommendedContainer.appendChild(produitDiv);
});

// Fonction pour ajouter au panier (simulation)
function ajouterAuPanier() {
    alert("Produit ajouté au panier !");
}

// Fonction pour voir les détails d'un produit recommandé
function voirDetails(id) {
    alert("Voir détails du produit ID : " + id);
}
