from django.contrib import admin
from .models import Item

# Register your models here.


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'group', 'archived', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('name',)
    ordering = ('-created_at',)

# admin.site.register(Item, ItemAdmin)
