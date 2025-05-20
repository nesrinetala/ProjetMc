from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Authentification
    path('inscription/', views.inscription_client_vendeur, name='inscription'),
    path('connexion/', views.connexion_client_vendeur, name='connexion'),
    path('logout/', views.logout_view, name='logout'),
    path('check-auth/', views.check_auth, name='check_auth'),

    # JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

   

    path('connexion/', views.connexion_utilisateur, name='connexion_utilisateur'),
     path('dashbordadmin/', views.dashbordadmin, name='dashboard_admin'),



]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
