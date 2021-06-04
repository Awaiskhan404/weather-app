from .GetLocationByIP import LocationByIP
from .WeatherLearning import GetStats
import json
import requests
def GetCurrentState(ip):
     Area=LocationByIP(ip)
     LocationDump=json.dumps(Area)
     LocationLoads=json.loads(LocationDump)
     print(LocationLoads)
     location=LocationLoads["city"]
     print(location)
     appid="a2fe069ff0dc1dbc0d9bdf7a73d7ace5"
     protocol="https://" 
     url=protocol+"api.openweathermap.org/data/2.5/weather?q="+ location +"&appid="+ appid
     response=requests.get(url)
     data=response.json()
     context=GetStats(data)
     return context