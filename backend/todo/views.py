from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
   

    def get_queryset(self):
        queryset = Todo.objects.all()

        search_query = self.request.query_params.get('search', None)
        if search_query is not None:
            queryset = queryset.filter(title__icontains=search_query)

        return queryset