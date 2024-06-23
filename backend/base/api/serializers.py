from rest_framework.serializers import ModelSerializer
from base.models import Alimento, Dispensa, Ingestao, Refeicao, User
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
        extra_kwargs = {"password": {"write_only": True}}

    def save(self):
        user = User(
            email=self.validated_data["email"],
            nome=self.validated_data["nome"],
            altura=self.validated_data["altura"],
            peso=self.validated_data["peso"],
            data_nascimento=self.validated_data["data_nascimento"],
            genero=self.validated_data["genero"],
            profile_pic=self.validated_data["profile_pic"]
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


class DispensaSerializer(ModelSerializer):
    class Meta:
        model = Dispensa
        fields = "__all__"


class RefeicaoSerializer(ModelSerializer):
    class Meta:
        model = Refeicao
        fields = "__all__"


class IngestaoSerializer(ModelSerializer):
    class Meta:
        model = Ingestao
        fields = "__all__"


# class GetInventorySerializer(ModelSerializer):
#     class Meta:
#         model = Inventory
#         fields = ["food", "id", "quantity"]
#         depth = 1


