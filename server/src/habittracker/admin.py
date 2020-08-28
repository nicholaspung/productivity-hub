from django.contrib import admin

# Register your models here.
from .models import Todo


class TodoAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'user_uid']
    search_fields = ['user_uid__username', 'user_uid__email']

    class Meta:
        model = Todo


admin.site.register(Todo, TodoAdmin)
