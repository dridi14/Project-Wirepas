from rest_framework import generics
from .serializers import UserSerializer
from django.shortcuts import render, redirect
from .models import student
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



class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@login_required
def home(request):
    obj = student.objects.all()
    context = {
        'objs': obj
    }
    return render(request, 'main/home.html', context)

