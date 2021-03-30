from django.shortcuts import render
from django.http import JsonResponse
from ipware import get_client_ip
from .GetLocationByIP import LocationByIP
import requests
import json

def today(request):
     ip=request.META.get("REMOTE_ADDR")
     ip="111.119.187.58"
     Area=LocationByIP(ip)
     LocationDump=json.dumps(Area)
     LocationLoads=json.loads(LocationDump)
     location=LocationLoads["city"]
     print(location)
     appid="a2fe069ff0dc1dbc0d9bdf7a73d7ace5"
     protocol="https://" 
     url=protocol+"api.openweathermap.org/data/2.5/weather?q="+ location +"&appid="+ appid
     response=requests.get(url)
     data=response.json()
     return JsonResponse(data,safe=False)

