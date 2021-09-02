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
     if tempreture>30:
         headline='Tempreture is ' +str(tempreture)+' Its hot outside Stay inside'
     elif tempreture in range(20,30):
         headline='Tempreture is ' +str(tempreture)+' Its good time for outing'
     elif tempreture in range(10,20):
         headline='Tempreture is ' +str(tempreture)+' Its good time for outing. Take care'
     elif tempreture in range(0,10):
         headline='Tempreture is ' +str(tempreture)+' Its very cold. Take care'
     print(headline)
     return render(request,'api/index.html',{
          'tempreture':tempreture,
          'state':CurrentState,
          'headline':headline
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
     if tempreture>30:
          headline='Tempreture is ' +str(tempreture)+' Its hot outside Stay inside'
     elif tempreture in range(20,30):
          headline='Tempreture is ' +str(tempreture)+' Its good time for outing'
     elif tempreture in range(10,20):
          headline='Tempreture is ' +str(tempreture)+' Its good time for outing. Take care'
     elif tempreture in range(0,10):
          headline='Tempreture is ' +str(tempreture)+' Its very cold. Take care'
     print(headline)
     return render(request,'api/index.html',{
          'tempreture':tempreture,
          'state':data,
          'headline':headline
     })
