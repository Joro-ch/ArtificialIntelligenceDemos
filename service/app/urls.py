from django.urls import path
from .views import transform_csv, sklearn_dt

urlpatterns = [
    path('transformCSV/', transform_csv, name='transform_csv'),
    path('sklearnDT/', sklearn_dt, name='sklearn_dt')
]
