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

     # Sort by name, priority, or due date if requested
        sort_by = self.request.query_params.get('sort_by', None)
        if sort_by is not None:
            if sort_by == 'name_asc':
                queryset = queryset.order_by('title')
            elif sort_by == 'name_desc':
                queryset = queryset.order_by('-title')
            elif sort_by == 'priority_asc':
                queryset = queryset.order_by('priority')
            elif sort_by == 'priority_desc':
                queryset = queryset.order_by('-priority')
            elif sort_by == 'due_date_asc':
                queryset = queryset.order_by('due_date')
            elif sort_by == 'due_date_desc':
                queryset = queryset.order_by('-due_date')

        return queryset