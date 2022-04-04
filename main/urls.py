from django.urls import path
from . import views

app_name = 'main'
urlpatterns = [
	path('', views.home, name='home'),
	path('about/', views.about, name='about'),
	path('datasets/', views.datasets, name='datasets'),
	path('tmp/', views.makeQuery, name='query'),
	path('results/', views.ResultsView.as_view(), name='results'),
	path('results/<str:result_id>/table/', views.TableView.as_view(), name='table'),
	path('results/<str:result_id>/network/', views.network, name='network'),
	path('result/<str:result_id>/download_csv/', views.downloadFile, name='download_csv'),
]
