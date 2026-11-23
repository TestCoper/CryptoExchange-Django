from django.urls import path
from . import views

urlpatterns = [
    path('<str:coin_name>/', views.get_single_price, name='single_price'),
    path('<str:from_coin>/<str:to_coin>/', views.get_pair_price, name='pair_price'),
]