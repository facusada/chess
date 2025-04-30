from django.db import models
from django.contrib.auth.models import User

class Tournament(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('ongoing', 'Ongoing'),
        ('finished', 'Finished'),
    ]

    MODE_CHOICES = [
        ('classic', 'Classic'),
        ('rapid', 'Rapid'),
        ('blitz', 'Blitz'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    mode = models.CharField(max_length=20, choices=MODE_CHOICES, default='classic')
    start_date = models.DateField()
    start_time = models.TimeField(null=True, blank=True)
    max_players = models.IntegerField(default=16)
    prize = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class TournamentParticipant(models.Model):
    tournament = models.ForeignKey(Tournament, related_name="participants", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="tournament_participations", on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('tournament', 'user')

    def __str__(self):
        return f"{self.user.username} in {self.tournament.name}"

class Match(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('finished', 'Finished'),
    ]

    tournament = models.ForeignKey(Tournament, related_name="matches", on_delete=models.CASCADE)
    player_one = models.ForeignKey(User, related_name="matches_as_player_one", on_delete=models.CASCADE)
    player_two = models.ForeignKey(User, related_name="matches_as_player_two", on_delete=models.CASCADE)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.player_one.username} vs {self.player_two.username} ({self.status})"
