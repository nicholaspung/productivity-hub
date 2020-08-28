"""baseapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from habittracker.views import todo_create_view, todo_delete_view, todo_detail_view, todo_list_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/todos/<int:todo_id>', todo_detail_view),
    path('api/todos/<int:todo_id>/delete', todo_delete_view),
    path('api/todos/', todo_list_view),
    path('api/todos/add', todo_create_view)
]
