import random

from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Tournament, TournamentParticipant, Match
from .serializers import TournamentSerializer, TournamentParticipantSerializer, MatchSerializer

# Listar todos los torneos
class TournamentListView(generics.ListAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [permissions.AllowAny]

# Crear un torneo (sólo usuarios autenticados)
class TournamentCreateView(generics.CreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [permissions.IsAuthenticated]

# Ver detalle de un torneo
class TournamentDetailView(generics.RetrieveAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'

# Inscribirse en un torneo
class TournamentRegisterView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, tournament_id):
        tournament = get_object_or_404(Tournament, id=tournament_id)

        # Validar duplicado
        if TournamentParticipant.objects.filter(tournament=tournament, user=request.user).exists():
            return Response(
                {"detail": "You are already registered in this tournament."},
                status=status.HTTP_400_BAD_REQUEST
            )

        participant = TournamentParticipant.objects.create(
            tournament=tournament,
            user=request.user
        )

        serializer = TournamentParticipantSerializer(participant)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# Listar participantes de un torneo
class TournamentParticipantsListView(generics.ListAPIView):
    serializer_class = TournamentParticipantSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        tournament_id = self.kwargs.get('tournament_id')
        return TournamentParticipant.objects.filter(tournament_id=tournament_id)

# Listar partidas de un torneo
class TournamentMatchesListView(generics.ListAPIView):
    serializer_class = MatchSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        tournament_id = self.kwargs.get('tournament_id')
        return Match.objects.filter(tournament_id=tournament_id)

class FullTournamentDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, id):
        try:
            tournament = Tournament.objects.get(id=id)
            participants = TournamentParticipant.objects.filter(tournament=tournament)
            matches = Match.objects.filter(tournament=tournament)

            response_data = {
                "tournament": TournamentSerializer(tournament).data,
                "participants": TournamentParticipantSerializer(participants, many=True).data,
                "matches": MatchSerializer(matches, many=True).data
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Tournament.DoesNotExist:
            return Response({"detail": "Tournament not found"}, status=status.HTTP_404_NOT_FOUND)

class GenerateMatchesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, tournament_id):
        tournament = get_object_or_404(Tournament, id=tournament_id)

        if Match.objects.filter(tournament=tournament).exists():
            return Response({"detail": "Matches have already been generated."}, status=status.HTTP_400_BAD_REQUEST)

        # Obtener participantes
        participant_ids = list(
            TournamentParticipant.objects.filter(tournament=tournament)
            .values_list("user_id", flat=True)
        )

        if len(participant_ids) < 2:
            return Response(
                {"detail": "Required 2 participants"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Mezclar y emparejar
        # No retorna un valor sino que mezcla el array que se le pase
        random.shuffle(participant_ids)
        matches_created = []

        for i in range(0, len(participant_ids) - 1, 2):
            player_one_id = participant_ids[i]
            player_two_id = participant_ids[i + 1]

            match = Match.objects.create(
                tournament=tournament,
                player_one_id=player_one_id,
                player_two_id=player_two_id,
                status='pending'
            )
            matches_created.append(match)

        # Si número impar, dejar un jugador libre (bye)
        if len(participant_ids) % 2 != 0:
            bye_user_id = participant_ids[-1]
            matches_created.append({
                "bye_user_id": bye_user_id,
                "note": "Jugador sin oponente en esta ronda"
            })

        # Serializar y devolver
        serializer = MatchSerializer(matches_created, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
