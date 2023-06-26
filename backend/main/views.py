from rest_framework import generics
from .serializers import UserSerializer
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from .models import student
from .serializers import UserSerializer
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required

# Create your views here.


def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})


def login(request):
    form = UserCreationForm(request.POST)
    return render(request, 'registration/login.html', {'form': form})



class CreateUserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@login_required
def home(request):
    obj = student.objects.all()
    context = {
        'objs': obj
    }
    return render(request, 'main/home.html', context)

