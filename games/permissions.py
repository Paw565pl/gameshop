from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        username = request.user.username
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.get("author") == username
