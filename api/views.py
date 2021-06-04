from django.shortcuts import render
from django.http import JsonResponse
from .GetCurrentState import GetCurrentState


def index(request):
     city='lahore'
     ip=request.META.get("REMOTE_ADDR")
     ip='111.119.187.1'
     CurrentState=GetCurrentState(ip=ip)
     print(CurrentState)
     return render(request,'api/index.html')
def GetCurrentStateByCity(request,city):
     appid="a2fe069ff0dc1dbc0d9bdf7a73d7ace5"
     protocol="https://" 
     url=protocol+"api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ appid
     response=requests.get(url)
     data=response.json()
     context=GetStats(data)
     return JsonResponse(context,safe=False)
     


