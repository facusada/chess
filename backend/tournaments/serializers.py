from rest_framework import serializers
from .models import Tournament, TournamentParticipant, Match
from django.contrib.auth.models import User

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = '__all__'

class TournamentParticipantSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    tournament = serializers.StringRelatedField()

    class Meta:
        model = TournamentParticipant
        fields = '__all__'

class MatchSerializer(serializers.ModelSerializer):
    player_one = serializers.StringRelatedField()
    player_two = serializers.StringRelatedField()
    tournament = serializers.StringRelatedField()

    class Meta:
        model = Match
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
