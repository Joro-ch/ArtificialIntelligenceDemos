from django.urls import path
from .views import transform_csv, sklearn_dt, scikitty_linear_regression, scikitty_logistic_regression

urlpatterns = [
    path('transformCSV/', transform_csv, name='transform_csv'),
    path('sklearnDT/', sklearn_dt, name='sklearn_dt'),
    path('scikitty_linear_regression/', scikitty_linear_regression, name='scikitty_linear_regression'),
    path('scikitty_logistic_regression/', scikitty_logistic_regression, name='scikitty_logistic_regression')
]
