from django.urls import path
from .views import mes_commandes, wishlist

urlpatterns = [
    path('mes-commandes/', mes_commandes, name='mes-commandes'),
    path('wishlist/', wishlist, name='wishlist'),
]
