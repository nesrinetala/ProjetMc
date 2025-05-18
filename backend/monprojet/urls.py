from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('ecommerce.urls')),  # Toutes les URLs de ecommerce seront préfixées par /api/
]