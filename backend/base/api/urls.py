from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("", views.rotas),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("users/cadastrar/", views.cadastrar, name="cadastrar"),
    path("users/<str:email>/", views.checkAccountExist),
    path("alimentos/", views.alimentos),
    # path("alimentos/<str:pk>", views.alimento),
    path("dispensas/", views.dispensas),
    # path("dispensas/<str:pk>", views.dispensa),
    path("refeicoes/", views.refeicoes),
    # path("refeicoes/<str:pk>", views.refeicao),
    path("ingestoes/", views.ingestoes),



    
    # path("inventory/", views.includeToInventory),
    # path("inventory/<str:pk>/", views.updateInventory),
    # path("inventory/<str:pk>/", views.deleteFromInventory),
    # path("meals/", views.getMyMeals),
    # path("meals/", views.createMeal),

]
