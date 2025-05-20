from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Produit, Utilisateur, Commande, LigneCommande, ClientVendeur, Profile,Administrateur 

class InscriptionClientVendeurSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(write_only=True, required=True)
    skin_type = serializers.ChoiceField(
        choices=Profile._meta.get_field('skin_type').choices,
        required=True
    )
    telephone = serializers.CharField(required=True)

    class Meta:
        model = ClientVendeur
        fields = ['username', 'email', 'password', 'password_confirmation', 'skin_type', 'telephone']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError({"password": "Les mots de passe ne correspondent pas"})
        return data

    def create(self, validated_data):
        skin_type = validated_data.pop('skin_type')
        validated_data['password'] = make_password(validated_data['password'])
        validated_data['role'] = 'client_vendeur'
        validated_data.pop('password_confirmation')
        
        user = ClientVendeur.objects.create(**validated_data)
        Profile.objects.create(user=user, skin_type=skin_type)
        return user

class ProduitWishlistSerializer(serializers.ModelSerializer):
    categorie = serializers.StringRelatedField()
    
    class Meta:
        model = Produit
        fields = ['id', 'nom', 'prix', 'description', 'categorie']
        read_only_fields = fields

class WishlistSerializer(serializers.ModelSerializer):
    wishlist = ProduitWishlistSerializer(many=True, read_only=True)

    class Meta:
        model = Utilisateur
        fields = ['wishlist']

class ProduitSerializer(serializers.ModelSerializer):
    caracteristiques = serializers.JSONField(required=False)
    prix_normal = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    vendeur = serializers.StringRelatedField()
    categorie = serializers.StringRelatedField()

    class Meta:
        model = Produit
        fields = [
            'id', 'nom', 'description', 'prix', 'prix_normal', 
            'categorie', 'image', 'stock', 'ingredients', 
            'mode_emploi', 'caracteristiques', 'vendeur'
        ]
        extra_kwargs = {
            'vendeur': {'read_only': True},
            'image': {'required': False}
        }

    def create(self, validated_data):
        caracteristiques = validated_data.pop('caracteristiques', {})
        produit = Produit.objects.create(**validated_data)
        
        # Ici vous pourriez stocker les caractéristiques dans un modèle séparé
        # ou les ajouter à la description selon vos besoins
        
        return produit

class LigneCommandeSerializer(serializers.ModelSerializer):
    produit = ProduitWishlistSerializer(read_only=True)
    prix_unitaire = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = LigneCommande
        fields = ['id', 'produit', 'quantite', 'prix_unitaire']
        read_only_fields = fields

class CommandeSerializer(serializers.ModelSerializer):
    lignes = LigneCommandeSerializer(many=True, read_only=True)
    client_vendeur = serializers.StringRelatedField()
    statut = serializers.CharField(read_only=True)

    class Meta:
        model = Commande
        fields = ['id', 'date', 'statut', 'client_vendeur', 'lignes', 'total']
        read_only_fields = fields

    def get_total(self, obj):
        return sum(ligne.prix_unitaire * ligne.quantite for ligne in obj.lignes.all())

class ClientVendeurSerializer(serializers.ModelSerializer):
    commandes = CommandeSerializer(many=True, read_only=True)
    wishlist = ProduitWishlistSerializer(many=True, read_only=True)

    class Meta:
        model = ClientVendeur
        fields = ['id', 'username', 'email', 'telephone', 'adresse', 'solde', 'commandes', 'wishlist', 'role']
        read_only_fields = fields