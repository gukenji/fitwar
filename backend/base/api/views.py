from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    RegistrationSerializer,
    AlimentoSerializer,
    EstoqueSerializer,
    RefeicaoSerializer,
    IngestaoSerializer,
    AlimentoInstanciaSerializer,
)
from base.models import Alimento, Refeicao, User, Estoque, Ingestao, AlimentoInstancia
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
        token["taxa_metabolica"] = user.taxa_metabolica
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def cadastrar(request):
    if request.method == "POST":
        serializer = RegistrationSerializer(data=request.data)
        print(serializer)
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
        token = AccessToken(request.META.get("HTTP_AUTHORIZATION").split(" ")[1])
        user_id = token.payload["user_id"]
        user = User.objects.get(id=user_id)
        serializer = AlimentoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def alimento(request, pk):
    alimento = Alimento.objects.filter(id=pk).first()
    if not alimento:
        return Response(
            {"msg": "alimento nao encontrado."}, status=status.HTTP_400_BAD_REQUEST
        )
    serializer = AlimentoSerializer(alimento, many=False)
    return Response(serializer.data)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def estoques(request):
    token = AccessToken(request.META.get("HTTP_AUTHORIZATION").split(" ")[1])
    user_id = token.payload["user_id"]
    user = User.objects.get(id=user_id)
    if request.method == "GET":
        estoques = Estoque.objects.filter(user=user)
        serializer = EstoqueSerializer(estoques, many=True)
        return Response(serializer.data)
    if request.method == "POST":
        serializer = EstoqueSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data)


@api_view(["DELETE", "PATCH"])
@permission_classes([IsAuthenticated])
def estoque(request, pk):
    token = AccessToken(request.META.get("HTTP_AUTHORIZATION").split(" ")[1])
    user_id = token.payload["user_id"]
    user = User.objects.get(id=user_id)
    estoque = Estoque.objects.filter(id=pk, user=user).first()

    if not estoque:
        return Response(
            {"msg": "item em estoque nao encontrado"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if estoque.user != user:
        return Response(
            {"msg": "usuario nao tem permissao para fazer a alteracao"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "DELETE":
        if estoque:
            estoque.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    if request.method == "PATCH":
        serializer = EstoqueSerializer(estoque, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def refeicoes(request):
    token = AccessToken(request.META.get("HTTP_AUTHORIZATION").split(" ")[1])
    user_id = token.payload["user_id"]
    user = User.objects.get(id=user_id)
    if request.method == "GET":
        refeicoes = Refeicao.objects.filter(user=user)
        serializer = RefeicaoSerializer(refeicoes, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = RefeicaoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data)


@api_view(["PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def refeicao(request, pk):
    token = AccessToken(request.META.get("HTTP_AUTHORIZATION").split(" ")[1])
    user_id = token.payload["user_id"]
    user = User.objects.get(id=user_id)
    refeicao = Refeicao.objects.filter(id=pk, user=user).first()

    if not refeicao:
        return Response(
            {"msg": "refeicao nao encontrada"}, status=status.HTTP_400_BAD_REQUEST
        )

    if refeicao.user != user:
        return Response(
            {"msg": "usuario nao tem permissao para fazer a alteracao"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "DELETE":
        if refeicao:
            refeicao.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    if request.method == "PATCH":
        serializer = RefeicaoSerializer(refeicao, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def ingestoes(request):
    token = AccessToken(request.META.get("HTTP_AUTHORIZATION").split(" ")[1])
    user_id = token.payload["user_id"]
    user = User.objects.get(id=user_id)
    if request.method == "GET":
        ingestoes = Ingestao.objects.filter(user=user)
        serializer = IngestaoSerializer(ingestoes, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        alimento_instancia = AlimentoInstancia.objects.get(
            id=request.data["alimento_instancia"]
        )

        if user != alimento_instancia.user:
            return Response(
                {"msg": "usuario não cadastrou esta instancia de alimento"},
                status=status.HTTP_403_FORBIDDEN,
            )

        if (
            alimento_instancia.calcularQuantidadeAtual() - request.data["quantidade"]
            < 0
        ):
            return Response(
                {"msg": "quantidade informada supera a quantidade disponivel"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = IngestaoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data)


@api_view(["PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def ingestao(request, pk):
    token = AccessToken(request.META.get("HTTP_AUTHORIZATION").split(" ")[1])
    user_id = token.payload["user_id"]
    user = User.objects.get(id=user_id)
    ingestao = Ingestao.objects.filter(id=pk, user=user).first()

    if not ingestao:
        return Response(
            {"msg": "ingestao nao encontrada"}, status=status.HTTP_400_BAD_REQUEST
        )

    if ingestao.user != user:
        return Response(
            {"msg": "usuario nao tem permissao para fazer a alteracao"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "DELETE":
        if ingestao:
            ingestao.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    if request.method == "PATCH":
        serializer = IngestaoSerializer(ingestao, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def alimentosInstancias(request):
    token = AccessToken(request.META.get("HTTP_AUTHORIZATION").split(" ")[1])
    user_id = token.payload["user_id"]
    user = User.objects.get(id=user_id)
    if request.method == "GET":
        alimentos_instancias = AlimentoInstancia.objects.filter(user=user)
        serializer = AlimentoInstanciaSerializer(alimentos_instancias, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = AlimentoInstanciaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data)


@api_view(["PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def alimentoInstancia(request, pk):
    token = AccessToken(request.META.get("HTTP_AUTHORIZATION").split(" ")[1])
    user_id = token.payload["user_id"]
    user = User.objects.get(id=user_id)
    alimento_instancia = AlimentoInstancia.objects.filter(id=pk, user=user).first()

    if not alimento_instancia:
        return Response(
            {"msg": "alimento nao encontrado"}, status=status.HTTP_400_BAD_REQUEST
        )

    if alimento_instancia.user != user:
        return Response(
            {"msg": "usuario nao tem permissao para fazer a alteracao"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "DELETE":
        if alimento_instancia:
            alimento_instancia.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    if request.method == "PATCH":
        serializer = AlimentoInstanciaSerializer(alimento_instancia, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data)


@api_view(["GET"])
def checkAccountExist(request, email):
    user = User.objects.filter(email=email)
    response = True if user else False
    return Response(response)
