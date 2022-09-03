from django.urls import path
from . import views

urlpatterns = [
    path('', views.PaymentReq, name='swap'),
    path('pay/<slug:slug>/', views.PayPage, name='paypage'),
    path('check/<slug:slug>/<str:id2>', views.SetTxn, name='paypage'),
    path('pay/mab/<slug:slug>/', views.GetPrice, name='mabpage'),
    ]