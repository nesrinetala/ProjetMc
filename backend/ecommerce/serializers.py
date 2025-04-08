from rest_framework import serializers
from .models import Produit, Utilisateur

class ProduitWishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = ['id', 'nom', 'prix', 'description']

class WishlistSerializer(serializers.ModelSerializer):
    wishlist = ProduitWishlistSerializer(many=True, read_only=True)

    class Meta:
        model = Utilisateur
        fields = ['wishlist']
