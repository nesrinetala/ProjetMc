from rest_framework.decorators import api_view, permission_classes, parser_classes
from django.contrib.auth import logout
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Produit, Utilisateur
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import ClientVendeurSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Produit
from .serializers import ProduitSerializer
from rest_framework.parsers import MultiPartParser, FormParser
import json
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Dans votre views.py (Django)
from django.http import JsonResponse
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status  
from .serializers import (
    InscriptionClientVendeurSerializer,
    WishlistSerializer
)
from django.middleware.csrf import get_token

from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import render

def is_admin(user):
    return user.role == 'admin'

@login_required
@user_passes_test(is_admin)
def dashbordadmin(request):
    return render(request, 'dashbordadmin.jsx')



import logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
def inscription_client_vendeur(request):
    logger.debug("Données reçues: %s", request.data)
    serializer = InscriptionClientVendeurSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'Inscription réussie',
            'user_id': user.id
        }, status=status.HTTP_201_CREATED)
    
    logger.error("Erreurs de validation: %s", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

logger = logging.getLogger(__name__)

@api_view(['POST'])
def connexion_client_vendeur(request):
    try:
        username_or_email = request.data.get('username') or request.data.get('email')
        password = request.data.get('password')
        
        if not username_or_email or not password:
            return Response(
                {'detail': 'Email/username et mot de passe requis'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = authenticate(username=username_or_email, password=password)
        
        if user is None:
            try:
                user = Utilisateur.objects.get(email=username_or_email)
                user = authenticate(username=user.username, password=password)
            except Utilisateur.DoesNotExist:
                user = None
        
        if user is None:
            return Response(
                {'detail': 'Identifiants incorrects'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        auth_login(request, user)
        
        return Response({
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role,  # Ajout du rôle dans la réponse
            'sessionid': request.session.session_key
        })
        
    except Exception as e:
        logger.error(f"Erreur de connexion: {str(e)}", exc_info=True)
        return Response(
            {'detail': 'Erreur interne du serveur'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'success': True})


@api_view(['GET'])
def check_auth(request):
    if request.user.is_authenticated:
        return Response({
            'isAuthenticated': True,
            'user': {
                'username': request.user.username,
                'email': request.user.email,
                # Ajoutez d'autres champs si nécessaire
            }
        })
    return Response({'isAuthenticated': False})

@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        user = authenticate(request, username=email, password=password)
        if user is not None:
            auth_login(request, user)
            return JsonResponse({
                'success': True,
                'user': {
                    'username': user.username,
                    'email': user.email,
                    # Ajoutez d'autres champs si nécessaire
                }
            })
        return JsonResponse({'success': False, 'error': 'Identifiants invalides'}, status=401)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)

@require_http_methods(["POST"])
def logout_view(request):
    try:
        auth_logout(request)
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def wishlist(request):
    if request.method == 'GET':
        serializer = WishlistSerializer(request.user)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        product_id = request.data.get('product_id')
        product = get_object_or_404(Produit, id=product_id)
        request.user.wishlist.add(product)
        return Response({'status': 'product added to wishlist'}, status=status.HTTP_200_OK)
    
    elif request.method == 'DELETE':
        product_id = request.data.get('product_id')
        product = get_object_or_404(Produit, id=product_id)
        request.user.wishlist.remove(product)
        return Response({'status': 'product removed from wishlist'}, status=status.HTTP_200_OK)
    

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            user = self.user
            serializer = ClientVendeurSerializer(user)
            response.data['user'] = serializer.data
        return response
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def ajouter_produit(request):
    try:
        # Préparer les données pour le sérialiseur
        data = request.data.copy()
        data['vendeur'] = request.user.id
        
        # Gérer les caractéristiques
        caracteristiques = {}
        for key, value in data.items():
            if key.startswith('caracteristiques['):
                prop_name = key.split('[')[1].rstrip(']')
                caracteristiques[prop_name] = value
        
        if caracteristiques:
            data['caracteristiques'] = json.dumps(caracteristiques)
        
        serializer = ProduitSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def connexion_utilisateur(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = Utilisateur.objects.get(email=email)
        if user.check_password(password):
            # Gérer la connexion et retourner le token JWT
            return Response({"message": "Connexion réussie"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Mot de passe incorrect"}, status=status.HTTP_401_UNAUTHORIZED)
    except Utilisateur.DoesNotExist:
        return Response({"error": "Utilisateur non trouvé"}, status=status.HTTP_404_NOT_FOUND)



class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Validation basique des entrées
        if not username or not password:
            return Response(
                {'error': 'Nom d\'utilisateur et mot de passe requis'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username, password=password)

        if user is not None:
            auth_login(request, user)
            return Response({
                'message': 'Connexion réussie',
                'role': user.role,
                'email': user.email,
                'username': user.username,
                'user_id': user.id  # Ajout recommandé
            }, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Nom d\'utilisateur ou mot de passe invalide'},
                status=status.HTTP_401_UNAUTHORIZED
            )