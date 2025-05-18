from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator

# === MODÈLES UTILISATEURS ===
class Utilisateur(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Administrateur'),
        ('client_vendeur', 'Client/Vendeur'),
        ('visiteur', 'Visiteur'),
    ]
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client_vendeur')
    telephone = models.CharField(max_length=15, blank=True, null=True)
    
    class Meta:
        verbose_name = "Utilisateur"

class ClientVendeur(Utilisateur):
    adresse = models.TextField()
    solde = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    class Meta:
        proxy = False

    def save(self, *args, **kwargs):
        self.role = 'client_vendeur'
        super().save(*args, **kwargs)

class Administrateur(Utilisateur):
    class Meta:
        proxy = True

    def gerer_clients(self):
        pass

    def gerer_produits(self):
        pass

# === MODÈLES CATALOGUE ===
class Categorie(models.Model):
    nom = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nom

class Produit(models.Model):
    vendeur = models.ForeignKey(ClientVendeur, on_delete=models.CASCADE)
    nom = models.CharField(max_length=255)
    description = models.TextField()
    prix = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    categorie = models.ForeignKey(Categorie, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to='produits/')
    stock = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    ingredients = models.TextField()
    mode_emploi = models.TextField()
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom

    def mettre_a_jour_stock(self, quantite):
        self.stock += quantite
        self.save()

class Commentaire(models.Model):
    client_vendeur = models.ForeignKey(ClientVendeur, on_delete=models.CASCADE)
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    texte = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

# === MODÈLES PANIER & COMMANDES ===
class Panier(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, null=True, blank=True)
    est_anonyme = models.BooleanField(default=False)
    session_id = models.CharField(max_length=100, blank=True)

    def calculer_total(self):
        return sum(ligne.prix_unitaire * ligne.quantite for ligne in self.lignes.all())

class LignePanier(models.Model):
    panier = models.ForeignKey(Panier, on_delete=models.CASCADE, related_name='lignes')
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    quantite = models.IntegerField(validators=[MinValueValidator(1)])
    prix_unitaire = models.DecimalField(max_digits=10, decimal_places=2)

class Commande(models.Model):
    STATUT_CHOICES = [
        ('en_attente', 'En attente'),
        ('payee', 'Payée'),
        ('livree', 'Livrée'),
        ('annulee', 'Annulée'),
    ]
    client_vendeur = models.ForeignKey(ClientVendeur, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='en_attente')

class LigneCommande(models.Model):
    commande = models.ForeignKey(Commande, on_delete=models.CASCADE, related_name='lignes')
    produit = models.ForeignKey(Produit, on_delete=models.PROTECT)
    quantite = models.IntegerField()
    prix_unitaire = models.DecimalField(max_digits=10, decimal_places=2)

# === MODÈLES PAIEMENT & LIVRAISON ===
class Paiement(models.Model):
    commande = models.OneToOneField(Commande, on_delete=models.CASCADE)
    montant = models.DecimalField(max_digits=10, decimal_places=2)
    methode = models.CharField(max_length=50)
    statut = models.CharField(max_length=20)
    date = models.DateTimeField(auto_now_add=True)

class Livraison(models.Model):
    commande = models.OneToOneField(Commande, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    statut = models.CharField(max_length=50)

# === MODÈLE HISTORIQUE ===
class HistoriqueConsultation(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    date_consultation = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('utilisateur', 'produit')

class Visiteur(Utilisateur):
    class Meta:
        proxy = True

    def ajouter_au_panier(self):
        pass

# === MODÈLE PROFIL ===
class Profile(models.Model):
    user = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name='profile')
    skin_type = models.CharField(max_length=50, choices=[
        ('seche', 'Sèche'),
        ('grasse', 'Grasse'), 
        ('mixte', 'Mixte'),
        ('normale', 'Normale'),
        ('sensible', 'Sensible')
    ])
