from django.urls import path, include
from .import views
urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/v2/current_state/',views.GetCurrentState,name="current_state"),
    path('api/v2/current_state_by_city/<str:city>/',views.GetCurrentStateByCity,name="bycity")
]
