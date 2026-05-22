from rest_framework import serializers
from .models import (
    User, UserProfil, Skill, Achievement,
    Event, Team, TeamMembership, Project, Task, Invitation, Account
)


# ─────────────────────────────────────────
# AUTH
# ─────────────────────────────────────────

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['name', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'image', 'created_at']
        read_only_fields = ['id', 'created_at']


# ─────────────────────────────────────────
# PROFIL & SKILLS
# ─────────────────────────────────────────

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'level']
        read_only_fields = ['id']


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id', 'title', 'organization', 'date']
        read_only_fields = ['id']


class UserProfilSerializer(serializers.ModelSerializer):
    user_name  = serializers.ReadOnlyField(source='user.name')
    user_email = serializers.ReadOnlyField(source='user.email')
    skills     = SkillSerializer(source='user.skills', many=True, read_only=True)
    achievements = AchievementSerializer(source='user.achievements', many=True, read_only=True)

    class Meta:
        model = UserProfil
        fields = [
            'id', 'user', 'user_name', 'user_email',
            'title', 'bio', 'phone', 'location',
            'website', 'github', 'linkedin', 'twitter',
            'skills', 'achievements',
        ]
        read_only_fields = ['id', 'user']


# ─────────────────────────────────────────
# ACCOUNT (OAuth)
# ─────────────────────────────────────────

class AccountSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Account
        fields = [
            'id', 'user', 'user_email', 'type', 'provider',
            'provider_account_id', 'token_type', 'scope',
            'expires_at', 'session_state',
        ]
        read_only_fields = ['id', 'user']
        # Les tokens sensibles sont exclus volontairement

