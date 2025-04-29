from rest_framework import generics, permissions
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
class TournamentRegisterView(generics.CreateAPIView):
    queryset = TournamentParticipant.objects.all()
    serializer_class = TournamentParticipantSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        tournament_id = self.kwargs.get('tournament_id')
        tournament = Tournament.objects.get(id=tournament_id)
        serializer.save(user=self.request.user, tournament=tournament)

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
