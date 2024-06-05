from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['POST'])
def process_data(request):
    # Recibe los datos del frontend
    data = request.data
    number = data.get('number', 0) * 2

    print("asdasdasdasdas", number)

    # Devuelve el resultado
    return Response({"processed_data": number})
