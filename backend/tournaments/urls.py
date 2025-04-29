from django.urls import path
from .views import *

urlpatterns = [
    path('tournaments/', TournamentListView.as_view(), name='tournament-list'),
    path('tournaments/create/', TournamentCreateView.as_view(), name='tournament-create'),
    path('tournaments/<int:id>/', TournamentDetailView.as_view(), name='tournament-detail'),
    path('tournaments/<int:tournament_id>/register/', TournamentRegisterView.as_view(), name='tournament-register'),
    path('tournaments/<int:tournament_id>/participants/', TournamentParticipantsListView.as_view(), name='tournament-participants'),
    path('tournaments/<int:tournament_id>/matches/', TournamentMatchesListView.as_view(), name='tournament-matches'),
]