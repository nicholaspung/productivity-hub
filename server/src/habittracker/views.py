from django.http import JsonResponse, Http404
from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer


@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def todo_create_view(request, *args, **kwargs):
    serializer = TodoSerializer(request.POST)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def todo_list_view(request, *args, **kwargs):
    qs = Todo.objects.all()
    serializer = TodoSerializer(qs, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def todo_detail_view(request, todo_id, *args, **kwargs):
    qs = Todo.objects.filter(id=todo_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TodoSerializer(obj)
    return Response(serializer.data, status=200)


@api_view(['DELETE'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def todo_delete_view(request, todo_id, *args, **kwargs):
    qs = Todo.objects.filter(id=todo_id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message": "You cannot delete this tweet."}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Todo removed."}, status=200)
