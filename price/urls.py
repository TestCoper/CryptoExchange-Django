from django.urls import path
from . import views

urlpatterns = [
    path('ETH/', views.Eth, name='Eth'),
    path('PIKA/', views.Pika, name='Pika'),
    path('POLYGON/', views.Polygon, name='Polygon'),
    path('BNB/', views.Bnb, name='Bnb'),
    path('USDC/', views.Usdc, name='Usdc'),



    path('ETH/PIKA/', views.EthPika, name='EthPika'),
    path('ETH/POLYGON/', views.EthPolygon, name='EthPolygon'),
    path('ETH/BNB/', views.EthBnb, name='EthBnb'),
    path('ETH/USDC/', views.EthUsdc, name='EthUsdc'),



    path('PIKA/ETH/', views.PikaEth, name='PikaEth'),
    path('PIKA/POLYGON/', views.PikaPolygon, name='PikaPolygon'),
    path('PIKA/BNB/', views.PikaBnb, name='PikaBnb'),
    path('PIKA/USDC/', views.PikaUsdc, name='PikaUsdc'),




    path('POLYGON/ETH/', views.PolygonEth, name='PolygonEth'),
    path('POLYGON/PIKA/', views.PolygonPika, name='PolygonPika'),
    path('POLYGON/BNB/', views.PolygonBnb, name='PolygonBnb'),
    path('POLYGON/USDC/', views.PolygonUsdc, name='PolygonUsdc'),



    path('BNB/ETH/', views.BnbEth, name='BnbEth'),
    path('BNB/PIKA/', views.BnbPika, name='BnbPika'),
    path('BNB/POLYGON/', views.BnbPolygon, name='BnbPolygon'),
    path('BNB/USDC/', views.BnbUsdc, name='BnbUsdc'),



    path('USDC/ETH/', views.UsdcEth, name='UsdcEth'),
    path('USDC/PIKA/', views.UsdcPika, name='UsdcPika'),
    path('USDC/POLYGON/', views.UsdcPolygon, name='UsdcPolygon'),
    path('USDC/BNB/', views.UsdcBnb, name='UsdcBnb'),
    ]