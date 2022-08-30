from django.urls import path
from . import views

urlpatterns = [
    path('', views.PaymentReq, name='swap'),
    path('pay/<slug:slug>/', views.PayPage, name='paypage'),
    ]