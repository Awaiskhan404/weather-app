from django.shortcuts import render
from django.http import JsonResponse
from .GetCurrentState import GetCurrentState
import requests

def index(request):
     city='lahore'
     ip=request.META.get("REMOTE_ADDR")
     ip='182.186.80.37'
     CurrentState=GetCurrentState(ip=ip)
     main=CurrentState["main"]
     tempreture=round(main["temp"]-270)
     print(tempreture)
     return render(request,'api/index.html',{
          'tempreture':tempreture,
          'state':CurrentState,
     })
def GetCurrentStateByCity(request):
     city = request.GET.get('city')
     appid="a2fe069ff0dc1dbc0d9bdf7a73d7ace5"
     protocol="https://" 
     url=protocol+"api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ appid
     response=requests.get(url)
     data=response.json()
     main=data["main"]
     tempreture=round(main["temp"]-270)
     print(tempreture)
     return render(request,'api/index.html',{
          'tempreture':tempreture,
          'state':data,
     })
     


