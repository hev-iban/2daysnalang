from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializers import RegisterSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(serializer.validated_data['password'])  # Ensure password is hashed
        user.save()
        
        token, _ = Token.objects.get_or_create(user=user)
        
        return Response({
            'message': 'Registration successful',
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    
    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'message': 'Login successful',
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Art
from .serializers import ArtSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_art(request):
    """Allows an authenticated user to upload an art listing"""
    user = request.user
    data = request.data

    # Check if image is provided
    image = request.FILES.get('image')

    # Create the art instance
    art = Art.objects.create(
        user=user,
        name=data.get('name'),
        image=image,
        description=data.get('description'),
        start_price=data.get('start_price'),
        fixed_price=data.get('fixed_price')
    )

    serializer = ArtSerializer(art, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def list_arts(request):
    """Retrieve all art listings"""
    arts = Art.objects.all().order_by('-created_at')
    serializer = ArtSerializer(arts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def art_detail(request, art_id):
    """Retrieve details of a specific art"""
    art = get_object_or_404(Art, _id=art_id)
    serializer = ArtSerializer(art, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_bid(request, art_id):
    """Place a bid on an artwork"""
    art = get_object_or_404(Art, _id=art_id)
    user = request.user
    bid_amount = request.data.get('bid_amount')

    if bid_amount is None or float(bid_amount) <= art.start_price:
        return Response({'error': 'Bid must be higher than the start price'}, status=status.HTTP_400_BAD_REQUEST)

    # Update the start price to reflect the latest bid
    art.start_price = float(bid_amount)
    art.save()

    return Response({'message': 'Bid placed successfully', 'new_price': art.start_price})
