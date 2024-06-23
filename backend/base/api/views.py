from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    RegistrationSerializer,
    AlimentoSerializer,
    DispensaSerializer,
    RefeicaoSerializer,
    IngestaoSerializer
)
from base.models import Alimento, Refeicao, User, Dispensa, Ingestao
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["nome"] = user.nome
        token["superuser"] = user.is_superuser
        token["staff"] = user.is_staff
        token["altura"] = user.altura
        token["peso"] = -user.peso
        token["data_nascimento"] = str(user.data_nascimento)
        token["genero"] = user.genero
        token["meta_calorias"] = user.meta_calorias
        token["profile_pic"] = str(user.profile_pic) if user.profile_pic else None
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def cadastrar(request):
    if request.method == "POST":
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(email=request.data["email"])
            data["response"] = "usuário registrado com sucesso!"
            data["email"] = user.email
            data["nome"] = user.nome
        else:
            data = serializer.errors
        return Response(data)


@api_view(["GET"])
def rotas(request):
    rotas = [
        "/api/token",
        "/api/token/refresh",
        "/api/users/",
        "/api/users/cadastrar",
        "/api/alimentos",
        "/api/meals",
        "/api/inventory/get/",
        "/api/inventory/include/<str:pk>/",
        "/api/inventory/update/<str:pk>/",
    ]
    return Response(rotas)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def alimentos(request):
    if request.method == "GET":
        alimentos = Alimento.objects.all()
        serializer = AlimentoSerializer(alimentos, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        token = AccessToken(request.META.get('HTTP_AUTHORIZATION').split(' ')[1])
        user_id = token.payload["user_id"]
        user = User.objects.get(id=user_id)
        serializer = AlimentoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data)
    

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def dispensas(request):
    if request.method == "GET":
        dispensas = Dispensa.objects.all()
        serializer = DispensaSerializer(dispensas, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        token = AccessToken(request.META.get('HTTP_AUTHORIZATION').split(' ')[1])
        user_id = token.payload["user_id"]
        user = User.objects.get(id=user_id)
        serializer = DispensaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def refeicoes(request):
    if request.method == "GET":
        refeicoes = Refeicao.objects.all()
        serializer = RefeicaoSerializer(refeicoes, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        token = AccessToken(request.META.get('HTTP_AUTHORIZATION').split(' ')[1])
        user_id = token.payload["user_id"]
        user = User.objects.get(id=user_id)
        serializer = RefeicaoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def ingestoes(request):
    if request.method == "GET":
        ingestoes = Ingestao.objects.all()
        serializer = IngestaoSerializer(ingestoes, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        token = AccessToken(request.META.get('HTTP_AUTHORIZATION').split(' ')[1])
        user_id = token.payload["user_id"]
        user = User.objects.get(id=user_id)
        serializer = IngestaoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data)
    
# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def getMyMeals(request):
#     user = request.user
#     meals = Meal.objects.filter(user=user)
#     serializer = MealSerializer(meals, many=True)
#     return Response(serializer.data)


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def createMeal(request):
#     token = AccessToken(request.data["token"])
#     user_id = token.payload["user_id"]
#     user = User.objects.get(id=user_id)
#     serializer = MealSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     serializer.save(user=user)
#     return Response(serializer.data)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def getInventory(request):
#     user = request.user
#     inventory = user.inventory_set.all()
#     serializer = GetInventorySerializer(inventory, many=True)
#     return Response(serializer.data)


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def includeToInventory(request):
#     token = AccessToken(request.data["token"])
#     user_id = token.payload["user_id"]
#     user = User.objects.get(id=user_id)
#     serializer = InventorySerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     serializer.save(user=user)
#     return Response(serializer.data)


# @api_view(["DELETE"])
# @permission_classes([IsAuthenticated])
# def deleteFromInventory(request, pk):
#     token = AccessToken(request.data["token"])
#     user_id = token.payload["user_id"]
#     user = User.objects.get(id=user_id)
#     inventory = Inventory.objects.get(id=pk, user=user)
#     if inventory:
#         inventory.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
#     else:
#         return Response({"msg": "teste"})


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def updateInventory(request, pk):
#     token = AccessToken(request.data["token"])
#     user_id = token.payload["user_id"]
#     user = User.objects.get(id=user_id)
#     inventory = Inventory.objects.get(id=pk, user=user)
#     serializer = InventorySerializer(instance=inventory, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     else:
#         return Response(serializer.errors)


@api_view(["GET"])
def checkAccountExist(request, email):
    user = User.objects.filter(email=email)
    response = True if user else False
    return Response(response)
