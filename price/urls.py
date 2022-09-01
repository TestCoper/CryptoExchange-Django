from django.urls import path
from . import views

urlpatterns = [
    path('ETH/', views.Eth, name='Eth'),
    path('PIKAU/', views.Pika, name='Pika'),
    path('Polygon/', views.Polygon, name='Polygon'),
    path('BNB/', views.Bnb, name='Bnb'),
    path('USDC/', views.Usdc, name='Usdc'),



    path('ETH/PIKAU/', views.EthPika, name='EthPika'),
    path('ETH/Polygon/', views.EthPolygon, name='EthPolygon'),
    path('ETH/BNB/', views.EthBnb, name='EthBnb'),
    path('ETH/USDC/', views.EthUsdc, name='EthUsdc'),



    path('PIKAU/ETH/', views.PikaEth, name='PikaEth'),
    path('PIKAU/Polygon/', views.PikaPolygon, name='PikaPolygon'),
    path('PIKAU/BNB/', views.PikaBnb, name='PikaBnb'),
    path('PIKAU/USDC/', views.PikaUsdc, name='PikaUsdc'),




    path('Polygon/ETH/', views.PolygonEth, name='PolygonEth'),
    path('Polygon/PIKAU/', views.PolygonPika, name='PolygonPika'),
    path('Polygon/BNB/', views.PolygonBnb, name='PolygonBnb'),
    path('Polygon/USDC/', views.PolygonUsdc, name='PolygonUsdc'),



    path('BNB/ETH/', views.BnbEth, name='BnbEth'),
    path('BNB/PIKAU/', views.BnbPika, name='BnbPika'),
    path('BNB/Polygon/', views.BnbPolygon, name='BnbPolygon'),
    path('BNB/USDC/', views.BnbUsdc, name='BnbUsdc'),



    path('USDC/ETH/', views.UsdcEth, name='UsdcEth'),
    path('USDC/PIKAU/', views.UsdcPika, name='UsdcPika'),
    path('USDC/Polygon/', views.UsdcPolygon, name='UsdcPolygon'),
    path('USDC/BNB/', views.UsdcBnb, name='UsdcBnb'),
    ]