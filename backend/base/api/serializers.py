from rest_framework.serializers import ModelSerializer
from base.models import Alimento, Estoque, Ingestao, Refeicao, User, AlimentoInstancia
from rest_framework import serializers


class RegistrationSerializer(ModelSerializer):
    password_confirmation = serializers.CharField(
        style={"input_type": "password"}, write_only=True
    )

    class Meta:
        model = User
        fields = [
            "email",
            "password",
            "password_confirmation",
            "nome",
            "altura",
            "peso",
            "data_nascimento",
            "genero",
            "profile_pic",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "profile_pic": {"required": False},
        }

    def save(self):
        print(self.validated_data)
        user = User(
            email=self.validated_data["email"],
            nome=self.validated_data["nome"],
            altura=self.validated_data["altura"],
            peso=self.validated_data["peso"],
            data_nascimento=self.validated_data["data_nascimento"],
            genero=self.validated_data["genero"],
            profile_pic=(
                self.validated_data["profile_pic"]
                if "profile_pic" in self.validated_data
                else None
            ),
        )

        password = self.validated_data["password"]
        password_confirmation = self.validated_data["password_confirmation"]
        if password != password_confirmation:
            raise serializers.ValidationError(
                {"error_message": "Senhas devem coincidir!"}
            )
        user.set_password(password)
        user.save()


class AlimentoSerializer(ModelSerializer):
    class Meta:
        model = Alimento
        fields = "__all__"


class EstoqueSerializer(ModelSerializer):
    class Meta:
        model = Estoque
        fields = "__all__"


class RefeicaoSerializer(ModelSerializer):
    class Meta:
        model = Refeicao
        fields = "__all__"


class IngestaoSerializer(ModelSerializer):
    class Meta:
        model = Ingestao
        fields = "__all__"


class AlimentoInstanciaSerializer(ModelSerializer):
    class Meta:
        model = AlimentoInstancia
        fields = "__all__"
