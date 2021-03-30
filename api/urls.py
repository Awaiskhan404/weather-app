from django.urls import path, include
from .import views
urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/v2/today/',views.today,name="today")
]
