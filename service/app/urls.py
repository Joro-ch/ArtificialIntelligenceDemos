from django.urls import path
from .views import process_data, transform_csv

urlpatterns = [
    path('process/', process_data, name='process_data'),
    path('transformCSV/', transform_csv, name='transform_csv'),
]
