from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Authentification
    path('inscription/', views.inscription_client_vendeur, name='inscription'),
    path('connexion/', views.connexion_client_vendeur, name='connexion'),
    path('logout/', views.logout_view, name='logout'),
    path('check-auth/', views.check_auth, name='check_auth'),

    # JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Produits
    path('produits/ajouter/', views.ajouter_produit, name='ajouter_produit'),
    # Vous pouvez ajouter d'autres URLs pour les produits ici
    # par exemple :
    # path('produits/', views.liste_produits, name='liste_produits'),
    # path('produits/<int:pk>/', views.detail_produit, name='detail_produit'),
]