from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Commande, LigneCommande, Livraison, Produit, Utilisateur
from django.shortcuts import get_object_or_404
from .serializers import CommandeSerializer, WishlistSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mes_commandes(request):
    # Récupère toutes les commandes de l'utilisateur connecté
    commandes = Commande.objects.filter(client_vendeur=request.user)
    
    # Sérialisation des données
    serializer = CommandeSerializer(commandes, many=True, context={'request': request})
    
    return Response(serializer.data)

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def wishlist(request):
    if request.method == 'GET':
        # Récupère la wishlist de l'utilisateur
        serializer = WishlistSerializer(request.user)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # Ajoute un produit à la wishlist
        product_id = request.data.get('product_id')
        product = get_object_or_404(Produit, id=product_id)
        request.user.wishlist.add(product)
        return Response({'status': 'product added to wishlist'}, status=status.HTTP_200_OK)
    
    elif request.method == 'DELETE':
        # Supprime un produit de la wishlist
        product_id = request.data.get('product_id')
        product = get_object_or_404(Produit, id=product_id)
        request.user.wishlist.remove(product)
        return Response({'status': 'product removed from wishlist'}, status=status.HTTP_200_OK)
